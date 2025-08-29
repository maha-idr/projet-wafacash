using WorkflowApp.Models;

public interface IDemandeRepository
{
    Task<IEnumerable<Demande>> GetAll();
    Task<Demande> GetById(int id);
    Task Add(Demande demande);
    Task Update(Demande demande);
    Task Delete(int id);
}
