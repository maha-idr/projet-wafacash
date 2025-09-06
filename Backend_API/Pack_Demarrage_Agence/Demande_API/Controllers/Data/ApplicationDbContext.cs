using Microsoft.EntityFrameworkCore;
using WorkflowApp.Models;

namespace Demande_API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Demande> Demandes { get; set; }
    }
}
