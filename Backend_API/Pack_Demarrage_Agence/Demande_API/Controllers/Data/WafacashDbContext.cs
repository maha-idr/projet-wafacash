using Microsoft.EntityFrameworkCore;
using WorkflowApp.Models;

namespace Demande_API.Data
{
    public class WafacashDbContext : DbContext
    {
        public WafacashDbContext(DbContextOptions<WafacashDbContext> options) : base(options) { }

        public DbSet<Demande> Demande { get; set; }
    }
}
