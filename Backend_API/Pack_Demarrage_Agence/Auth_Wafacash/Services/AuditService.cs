using Auth_Wafacash.Data;
using Auth_Wafacash.Models;

namespace Auth_Wafacash.Services;

public class AuditService(AppDbContext db)
{
    public async Task LogAsync(int? userId, string action, string? details, string? ip, string? ua)
    {
        db.AuditLogs.Add(new AuditLog { UserId = userId, Action = action, Details = details, Ip = ip, UserAgent = ua });
        await db.SaveChangesAsync();
    }
}
