using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Auth_Wafacash.Data;
using Auth_Wafacash.Models;
using Auth_Wafacash.Services;

var builder = WebApplication.CreateBuilder(args);

// EF Core
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// JWT Options
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));
var jwtSection = builder.Configuration.GetSection("Jwt");
var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["Key"]!));

// Auth
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSection["Issuer"],
            ValidAudience = jwtSection["Audience"],
            IssuerSigningKey = signingKey,
            ClockSkew = TimeSpan.FromSeconds(30)
        };
    });

builder.Services.AddAuthorization(opts =>
{
    // ?? plus de politique AdminOnly
    opts.AddPolicy("CommercialOnly", p => p.RequireRole("Commercial"));
    opts.AddPolicy("SupportOnly", p => p.RequireRole("Support_IT"));
    opts.AddPolicy("AdminOnly", p => p.RequireRole("Admin")); ;

});

// Rate limiting auth
builder.Services.AddRateLimiter(_ => _
    .AddPolicy("AuthTight", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "anon",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 10,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            })));

// Services
builder.Services.AddScoped<AuditService>();
builder.Services.AddScoped<TokenService>();
builder.Services.AddSingleton<IPasswordHasher, BCryptPasswordHasher>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();


// Migrate + Seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();

    // Seed des rôles
    if (!db.Roles.Any())
    {
        db.Roles.AddRange(
            new Role { Name = "Commercial" },
            new Role { Name = "Support_IT" },
            new Role { Name = "Admin" } // ✅ ajouté
        );
        await db.SaveChangesAsync();
    }

    // (Optionnel) seed d’un utilisateur admin
    if (!db.Users.Any(u => u.Username == "admin"))
    {
        var hasher = scope.ServiceProvider.GetRequiredService<IPasswordHasher>();
        var admin = new User
        {
            Name = "Super Admin",
            Email = "admin@wafa.local",
            Username = "admin",
            PasswordHash = hasher.Hash("Admin@123!"),
            IsActive = true
        };
        db.Users.Add(admin);
        await db.SaveChangesAsync();

        var adminRoleId = db.Roles.Single(r => r.Name == "Admin").Id;
        db.UserRoles.Add(new UserRole { UserId = admin.Id, RoleId = adminRoleId });
        await db.SaveChangesAsync();
    }



}
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowReactApp");

app.UseRateLimiter();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
