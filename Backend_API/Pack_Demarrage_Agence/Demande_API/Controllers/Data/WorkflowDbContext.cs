using Microsoft.EntityFrameworkCore;
using WorkflowApp.Models;

namespace Demande_API.Data
{
    public class WorkflowDbContext : DbContext
    {
        public WorkflowDbContext(DbContextOptions<WorkflowDbContext> options)
            : base(options) { }

        public DbSet<Demande> Demande { get; set; }
    }
}
