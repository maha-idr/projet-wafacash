using WorkflowApp.Models;

public interface IDemandeRepository
{
    Task<IEnumerable<Demande>> GetAll();
    Task<Demande> GetById(int id);
    Task Add(Demande demande);
    Task Update(Demande demande);
    Task<IEnumerable<Demande>> GetDemandesAsync(ConsultationFilterDto filter);
    Task Delete(int id);
    Task<IEnumerable<DemandeConsultationDto>> GetDemandesWithFilters(ConsultationFilterDto filters);
    Task<byte[]> ExportDemandesToCsv(ConsultationFilterDto filters);
}


