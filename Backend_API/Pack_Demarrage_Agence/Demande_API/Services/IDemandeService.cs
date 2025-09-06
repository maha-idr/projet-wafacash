using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Demande_API.DTO;

namespace Demande_API.Services
{
    public interface IDemandeService
    {
        Task<List<DemandeReadDto>> GetPendingAsync(CancellationToken ct = default);
        Task<DemandeReadDto?> GetByIdAsync(int id, CancellationToken ct = default);
        Task<bool> UpdateAffectationAsync(int id, UpdateAffectationDto dto, CancellationToken ct = default);
    }
}
