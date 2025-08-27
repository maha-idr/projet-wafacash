﻿namespace Auth_Wafacash.Models;

public class Role
{
    public int Id { get; set; }
    public string Name { get; set; } = default!;
    public ICollection<UserRole> UserRoles { get; set; } = new List<UserRole>();
}
