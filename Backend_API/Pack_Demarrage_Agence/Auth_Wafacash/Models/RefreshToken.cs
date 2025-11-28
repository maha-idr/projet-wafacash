namespace Auth_Wafacash.Models;

public class RefreshToken
{
    public int Id { get; set; }
    public string Token { get; set; } = default!;
    public DateTimeOffset ExpiresAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? RevokedAt { get; set; }
    public string? ReplacedByToken { get; set; }

    public int UserId { get; set; }
    public User User { get; set; } = default!;

    public string? IpAddress { get; set; }
    public string? DeviceInfo { get; set; }

    public bool IsActive => RevokedAt is null && DateTimeOffset.UtcNow <= ExpiresAt;
}
