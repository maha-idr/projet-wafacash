using WorkflowApp.Models;

public interface IDemandeRepository
{
    Task<List<Demande>> GetAllAsync();
    Task<Demande?> GetByIdAsync(int id);
    Task AddAsync(Demande demande);
    Task UpdateAsync(Demande demande);
    Task<List<Demande>> GetDemandesAsync(ConsultationFilterDto filter);
    Task DeleteAsync(int id);
    //Task<List<DemandeConsultationDto>> GetDemandesWithFiltersAsync(ConsultationFilterDto filters);
    //Task<byte[]> ExportDemandesToCsvAsync(ConsultationFilterDto filters);
}
