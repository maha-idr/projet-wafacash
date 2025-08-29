using Demande_API.Data;
using Microsoft.EntityFrameworkCore;
using WorkflowApp.Models;

public class DemandeRepository : IDemandeRepository
{
    private readonly ApplicationDbContext _context;

    public DemandeRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Demande>> GetAll()
        => await _context.Demandes.ToListAsync();

    public async Task<Demande> GetById(int id)
        => await _context.Demandes.FindAsync(id);

    public async Task Add(Demande demande)
    {
        _context.Demandes.Add(demande);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Demande demande)
    {
        _context.Demandes.Update(demande);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var demande = await _context.Demandes.FindAsync(id);
        if (demande != null)
        {
            _context.Demandes.Remove(demande);
            await _context.SaveChangesAsync();
        }
    }
}
