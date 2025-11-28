using System.ComponentModel.DataAnnotations;

namespace Auth_Wafacash.Models;

public class User
{
    public int Id { get; set; }
    [MaxLength(120)] public string Name { get; set; } = default!;
    [MaxLength(120)] public string Email { get; set; } = default!;
    [MaxLength(60)] public string Username { get; set; } = default!;
    public string PasswordHash { get; set; } = default!;
    public bool IsActive { get; set; } = true;

    // Lockout (après 5 échecs / 15 min)
    public DateTimeOffset? LockedUntil { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; set; }

    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
    public ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
