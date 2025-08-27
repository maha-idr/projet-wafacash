namespace Auth_Wafacash.Services;

public class BCryptPasswordHasher : IPasswordHasher
{
    public string Hash(string password) => BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);
    public bool Verify(string hash, string password) => BCrypt.Net.BCrypt.Verify(password, hash);
}
