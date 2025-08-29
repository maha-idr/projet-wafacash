using Demande_API.DTO;
using Demande_API.DTOs;
using System.Collections.Generic;
using WorkflowApp.DTOs;
using WorkflowApp.Models;

namespace Demande_API.Services
{
    public interface IDemandeService
    {
        Demande CreateDemande(DemandeCreateDto dto);
        List<DemandeReadDto> GetAllDemandes();
        DemandeReadDto? GetDemandeById(int id);
        bool UpdateDemande(int id, DemandeUpdateDto dto);
        bool DeleteDemande(int id);
    }
}
