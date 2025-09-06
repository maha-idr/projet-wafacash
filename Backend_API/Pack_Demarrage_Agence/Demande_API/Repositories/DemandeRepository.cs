
using Demande_API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;
using System.Linq;
using System.Text;
using WorkflowApp.Models;

public class DemandeRepository : IDemandeRepository
{
    private readonly WafacashDbContext _context;

    public DemandeRepository(WafacashDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Demande>> GetAll()
        => await _context.Demande.ToListAsync();

    public async Task<IEnumerable<Demande>> GetDemandesAsync(ConsultationFilterDto filter)
    {
        var query = _context.Demande.AsQueryable();

        // Filtre par dates (si elles sont fournies)
        if (filter.DateDebut.HasValue)
            query = query.Where(d => d.DateSaisie >= filter.DateDebut.Value);

        if (filter.DateFin.HasValue)
            query = query.Where(d => d.DateSaisie <= filter.DateFin.Value);

        // Filtre par statut (si fourni et non vide)
        if (filter.Statut.HasValue)
            
        query = query.Where(d => d.Statut == filter.Statut);

        return await query.ToListAsync();
    }


    public async Task<Demande> GetById(int id)
        => await _context.Demande.FindAsync(id);

    public async Task Add(Demande demande)
    {
        _context.Demande.Add(demande);
        await _context.SaveChangesAsync();
    }

    public async Task Update(Demande demande)
    {
        _context.Demande.Update(demande);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var demande = await _context.Demande.FindAsync(id);
        if (demande != null)
        {
            _context.Demande.Remove(demande);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Demande>> GetDemandesWithFilters(ConsultationFilterDto filters)
    {
        return _context.Demande.Where(d => d.Statut == 0);

      
    }
        

    //var query = _context.Demande.AsQueryable();

    //// Appliquer les filtres
    //if (filters.DateDebut.HasValue)
    //{
    //    query = query.Where(d => d.DateSaisie >= filters.DateDebut.Value);
    //}

    //if (filters.DateFin.HasValue)
    //{
    //    query = query.Where(d => d.DateSaisie <= filters.DateFin.Value);
    //}

    //if (filters.Statut.HasValue)
    //{
    //    query = query.Where(d => d.Statut == filters.Statut.Value);
    //}

    //return await query
    //    .Select(d => new DemandeConsultationDto
    //    {
    //        Id = d.Id,
    //        LibelleMandataire = d.LibelleMandataire,
    //        Region = d.Region,
    //        TypeReseau = d.TypeReseau,
    //        Code = d.Code,
    //        NomAgence = d.NomAgence,
    //        TelephoneContact = d.TelephoneContact,
    //        Ville = d.Ville,
    //        AdresseLivraison = d.AdresseLivraison,
    //        EnvoisModem = d.EnvoisModem,
    //        Modem = d.Modem,
    //        Statut = d.Statut,
    //        DateSaisie = d.DateSaisie
    //    })
    //    .OrderByDescending(d => d.DateSaisie)
    //    .ToListAsync();




    public Task<List<Demande>> GetPendingAsync(CancellationToken ct = default) =>
        _context.Demande.Where(d => d.Statut == 0)
                      .OrderBy(d => d.DateSaisie)
                      .ToListAsync(ct);

    public Task<Demande?> GetByIdAsync(int id, CancellationToken ct = default) =>
        _context.Demande.FirstOrDefaultAsync(d => d.Id == id, ct);
    public async Task<byte[]> ExportDemandesToCsv(ConsultationFilterDto filters)
    {
        var demandes = await GetDemandesWithFilters(filters);
        
        using (var memoryStream = new MemoryStream())
        using (var streamWriter = new StreamWriter(memoryStream, Encoding.UTF8))
        using (var csvWriter = new CsvWriter(streamWriter, CultureInfo.InvariantCulture))
        {
            // Écrire l'en-tête
            csvWriter.WriteHeader<DemandeConsultationDto>();
            csvWriter.NextRecord();

            // Écrire les données
            csvWriter.WriteRecords(demandes);

            streamWriter.Flush();
            return memoryStream.ToArray();
        }
    }

    Task<IEnumerable<DemandeConsultationDto>> IDemandeRepository.GetDemandesWithFilters(ConsultationFilterDto filters)
    {
        throw new NotImplementedException();
    }
}