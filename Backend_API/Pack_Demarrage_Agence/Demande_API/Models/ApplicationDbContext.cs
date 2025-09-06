using Microsoft.EntityFrameworkCore;

namespace Demande_API.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
    public DbSet<Demande> Demandes => Set<Demande>();
}
