namespace Auth_Wafacash.Models;

public class LoginAttempt
{
    public int Id { get; set; }
    public int? UserId { get; set; }
    public string? UsernameOrEmail { get; set; }
    public bool Succeeded { get; set; }
    public DateTimeOffset OccurredAt { get; set; } = DateTimeOffset.UtcNow;
    public string? IpAddress { get; set; }
}
