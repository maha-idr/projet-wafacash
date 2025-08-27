using Auth_Wafacash.Contracts;
using Auth_Wafacash.Data;
using Auth_Wafacash.Models;
using Auth_Wafacash.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace Auth_Wafacash.Controllers;

[ApiController]
[Route("auth")]
public class AuthController(
    AppDbContext db,
    IPasswordHasher hasher,
    TokenService tokens,
    AuditService audit,
    IHttpContextAccessor? accessor = null) : ControllerBase
{
    private HttpContext Ctx => accessor?.HttpContext ?? HttpContext;
    private string? Ip => Ctx.Connection.RemoteIpAddress?.ToString();
    private string? UA => Ctx.Request.Headers.UserAgent.ToString();

    [HttpPost("register")]
    //[Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Register(RegisterRequest req)
    {
        // Validation du mot de passe
        if (req.Password.Length < 8 ||
            !req.Password.Any(char.IsUpper) ||
            !req.Password.Any(char.IsLower) ||
            !req.Password.Any(char.IsDigit) ||
            !req.Password.Any(ch => "!@#$%^&*()_+-=[]{};:,.?/".Contains(ch)))
            return BadRequest("Mot de passe trop faible (8+, maj/min/chiffre/spécial).");

        // Vérification de l'unicité email/username
        if (await db.Users.AnyAsync(u => u.Email == req.Email))
            return Conflict("Email déjà utilisé.");

        if (await db.Users.AnyAsync(u => u.Username == req.Username))
            return Conflict("Username déjà utilisé.");

        // Vérification que les rôles demandés existent
        var existingRoles = await db.Roles.Where(r => req.Roles.Contains(r.Name)).ToListAsync();
        if (existingRoles.Count != req.Roles.Length)
            return BadRequest("Un ou plusieurs rôles spécifiés n'existent pas.");

        // Création de l'utilisateur
        var user = new User
        {
            Name = req.Name,
            Email = req.Email,
            Username = req.Username,
            PasswordHash = hasher.Hash(req.Password),
            IsActive = true
        };

        try
        {
            // Sauvegarde de l'utilisateur pour obtenir l'ID
            db.Users.Add(user);
            await db.SaveChangesAsync();

            // Ajout des rôles
            foreach (var role in existingRoles)
            {
                db.UserRoles.Add(new UserRole
                {
                    UserId = user.Id,
                    RoleId = role.Id
                });
            }

            await db.SaveChangesAsync();

            await audit.LogAsync(null, "Register", $"UserId={user.Id}, Roles={string.Join(",", req.Roles)}", Ip, UA);
            return Ok(new { message = "Utilisateur créé avec succès.", userId = user.Id });
        }
        catch (DbUpdateException ex)
        {
            // Log de l'erreur détaillée
            Console.WriteLine($"Erreur lors de l'enregistrement: {ex.InnerException?.Message ?? ex.Message}");
            return StatusCode(500, new { message = "Erreur lors de l'enregistrement en base de données." });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Erreur inattendue: {ex.Message}");
            return StatusCode(500, new { message = "Erreur interne du serveur." });
        }
    }

    [HttpPost("login")]
    [EnableRateLimiting("AuthTight")]
    public async Task<ActionResult<LoginResponse>> Login(LoginRequest req)
    {
        var now = DateTimeOffset.UtcNow;
        var user = await db.Users.Include(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .SingleOrDefaultAsync(u => u.Email == req.Identifier || u.Username == req.Identifier);

        if (user is not null && user.LockedUntil is not null && user.LockedUntil > now)
            return StatusCode(423, new { message = "Compte verrouillé 15 min." });

        var ok = user is not null && hasher.Verify(user.PasswordHash, req.Password) && user.IsActive;

        db.LoginAttempts.Add(new LoginAttempt { UserId = user?.Id, UsernameOrEmail = req.Identifier, Succeeded = ok, IpAddress = Ip });
        await db.SaveChangesAsync();

        if (!ok)
        {
            if (user is not null)
            {
                var since = now.AddMinutes(-15);
                var fails = await db.LoginAttempts.Where(a => a.UserId == user.Id && !a.Succeeded && a.OccurredAt >= since).CountAsync();
                if (fails >= 5) { user.LockedUntil = now.AddMinutes(15); await db.SaveChangesAsync(); }
            }
            return Unauthorized(new { message = "Identifiant ou mot de passe invalide" });
        }

        user!.LockedUntil = null;
        await db.SaveChangesAsync();

        var roles = user.UserRoles.Select(ur => ur.Role.Name).ToArray();
        var (access, exp) = tokens.CreateAccessToken(user.Id, user.Username, roles);
        var refresh = tokens.CreateRefreshToken();

        db.RefreshTokens.Add(new RefreshToken { UserId = user.Id, Token = refresh, ExpiresAt = now.AddDays(7), IpAddress = Ip, DeviceInfo = UA });
        await db.SaveChangesAsync();

        await audit.LogAsync(user.Id, "Login", null, Ip, UA);
        return Ok(new LoginResponse(access, refresh, exp, roles));
    }

    [HttpPost("refresh")]
    [EnableRateLimiting("AuthTight")]
    public async Task<ActionResult<LoginResponse>> Refresh(RefreshRequest req)
    {
        var now = DateTimeOffset.UtcNow;
        var rt = await db.RefreshTokens.Include(r => r.User).ThenInclude(u => u.UserRoles).ThenInclude(ur => ur.Role)
            .SingleOrDefaultAsync(r => r.Token == req.RefreshToken);

        if (rt is null || !rt.IsActive) return Unauthorized(new { message = "Refresh token invalide." });

        rt.RevokedAt = now;
        var newRt = tokens.CreateRefreshToken();
        db.RefreshTokens.Add(new RefreshToken { UserId = rt.UserId, Token = newRt, ExpiresAt = now.AddDays(7), IpAddress = Ip, DeviceInfo = UA, ReplacedByToken = rt.Token });

        var roles = rt.User.UserRoles.Select(x => x.Role.Name).ToArray();
        var (access, exp) = tokens.CreateAccessToken(rt.User.Id, rt.User.Username, roles);
        await db.SaveChangesAsync();

        await audit.LogAsync(rt.UserId, "Refresh", null, Ip, UA);
        return Ok(new LoginResponse(access, newRt, exp, roles));
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout(RefreshRequest req)
    {
        var rt = await db.RefreshTokens.SingleOrDefaultAsync(r => r.Token == req.RefreshToken);
        if (rt is not null) { rt.RevokedAt = DateTimeOffset.UtcNow; await db.SaveChangesAsync(); await audit.LogAsync(rt.UserId, "Logout", null, Ip, UA); }
        return Ok(new { message = "Déconnecté." });
    }
}