using Microsoft.EntityFrameworkCore;
using WorkflowApp.Models; // pour Demande

namespace Demande_API.Data
{
    public class WafacashDbContext : DbContext
    {
        public WafacashDbContext(DbContextOptions<WafacashDbContext> options)
            : base(options)
        {
        }

        public DbSet<Demande> Demande { get; set; }

        public static implicit operator WafacashDbContext(WorkflowDbContext v)
        {
            throw new NotImplementedException();
        }
    }
}
