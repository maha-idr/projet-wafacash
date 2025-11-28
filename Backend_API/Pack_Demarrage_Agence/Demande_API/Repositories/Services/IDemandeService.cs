using Demande_API.DTO;
using Demande_API.DTOs;
using System.Collections.Generic;
using WorkflowApp.DTOs;
using WorkflowApp.Models;

namespace Demande_API.Services
{
    public interface IDemandeService
    {
        Task CreateDemande(DemandeCreateDto dto);
        Task<List<DemandeReadDto>> GetAllDemandesAsync();
        Task<DemandeReadDto?> GetDemandeById(int id);
        Task<bool> UpdateDemande(int id, DemandeUpdateDto dto);
        Task<List<DemandeConsultationDto>> GetFilteredDemandesAsync(ConsultationFilterDto filters);
        Task<List<DemandeReadDto>> GetPendingAsync(CancellationToken ct = default);

    }
}
