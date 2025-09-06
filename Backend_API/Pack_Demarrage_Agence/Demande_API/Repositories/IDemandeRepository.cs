using Demande_API.Models;

namespace Demande_API.Repositories;

public interface IDemandeRepository
{
    Task<List<Demande>> GetPendingAsync(CancellationToken ct = default);      // statut = 0
    Task<Demande?> GetByIdAsync(int id, CancellationToken ct = default);
    Task UpdateAsync(Demande demande, CancellationToken ct = default);
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}
