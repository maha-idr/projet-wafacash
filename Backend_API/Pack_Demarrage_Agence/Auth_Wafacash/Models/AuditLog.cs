namespace Auth_Wafacash.Models;

public class AuditLog
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string Action { get; set; } = default!; // Login, Logout, Refresh...
    public string? Details { get; set; }
    public DateTimeOffset At { get; set; } = DateTimeOffset.UtcNow;
    public string? Ip { get; set; }
    public string? UserAgent { get; set; }
}
