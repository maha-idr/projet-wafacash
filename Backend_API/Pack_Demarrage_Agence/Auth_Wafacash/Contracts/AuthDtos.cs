namespace Auth_Wafacash.Contracts;

public record LoginRequest(string Identifier, string Password);   // email ou username
public record LoginResponse(string AccessToken, string RefreshToken, DateTimeOffset ExpiresAt, string[] Roles);

public record RefreshRequest(string RefreshToken);
public record RegisterRequest(string Name, string Email, string Username, string Password, string[] Roles);
