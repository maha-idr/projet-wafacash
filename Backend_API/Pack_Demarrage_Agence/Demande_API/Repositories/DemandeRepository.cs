using Demande_API.Models;
using Microsoft.EntityFrameworkCore;

namespace Demande_API.Repositories;

public class DemandeRepository : IDemandeRepository
{
    private readonly ApplicationDbContext _db;
    public DemandeRepository(ApplicationDbContext db) => _db = db;

    public Task<List<Demande>> GetPendingAsync(CancellationToken ct = default) =>
        _db.Demandes.Where(d => d.Statut == 0)
                    .OrderBy(d => d.DateSaisie)
                    .ToListAsync(ct);

    public Task<Demande?> GetByIdAsync(int id, CancellationToken ct = default) =>
        _db.Demandes.FirstOrDefaultAsync(d => d.Id == id, ct);

    public Task UpdateAsync(Demande demande, CancellationToken ct = default)
    {
        _db.Demandes.Update(demande);
        return Task.CompletedTask;
    }

    public Task<int> SaveChangesAsync(CancellationToken ct = default) =>
        _db.SaveChangesAsync(ct);
}
