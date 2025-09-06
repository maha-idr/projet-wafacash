// Controllers/ConsultationController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
//[Authorize]
public class ConsultationController : ControllerBase
{
    private readonly IDemandeRepository _demandeRepository;

    public ConsultationController(IDemandeRepository demandeRepository)
    {
        _demandeRepository = demandeRepository;
    }

    [HttpPost("filter")]
    public async Task<IActionResult> GetFilteredDemandes([FromBody] ConsultationFilterDto filters)
    {
        try
        {
            var demandes = await _demandeRepository.GetDemandesAsync(filters);
            //var demandes = await _demandeRepository.GetDemandesWithFilters(filters);
            return Ok(demandes);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erreur lors de la récupération des demandes: {ex.Message}");
        }
    }

    [HttpPost("export")]
    public async Task<IActionResult> ExportDemandes([FromBody] ConsultationFilterDto filters)
    {
        try
        {
            var fileContent = await _demandeRepository.ExportDemandesToCsv(filters);

            return File(fileContent, "text/csv", $"demandes_export_{DateTime.Now:yyyyMMddHHmmss}.csv");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erreur lors de l'export des demandes: {ex.Message}");
        }
    }
}