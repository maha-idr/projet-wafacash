using Demande_API.DTOs;
using Demande_API.Services;
using Microsoft.AspNetCore.Mvc;
using WorkflowApp.DTOs;

namespace Demande_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DemandesController : ControllerBase
    {
        private readonly IDemandeService _service;

        public DemandesController(IDemandeService service)
        {
            _service = service;
        }

        [HttpPost("CreateDemande")]
        public IActionResult CreateDemande([FromBody] DemandeCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var demande = _service.CreateDemande(dto);
            return Ok(new { message = "Demande enregistrée !"});
        }

        [HttpGet]
        public async Task<IActionResult> GetDemandesAsync() => Ok(await _service.GetAllDemandesAsync());

        [HttpGet("{id}")]
        public IActionResult GetDemandeById(int id)
        {
            var demande = _service.GetDemandeById(id);
            if (demande == null) return NotFound(new { message = "Demande non trouvée" });
            return Ok(demande);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDemande(int id, [FromBody] DemandeUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.UpdateDemande(id, dto);
            if (!updated)
                return NotFound(new { message = "Demande non trouvée" });

            return Ok(new { message = "Demande mise à jour !" });
        }


        [HttpPost("filter")]
        public async Task<IActionResult> GetFilteredDemandes([FromBody] ConsultationFilterDto filters)
        {
            try
            {
                var demandes = await _service.GetFilteredDemandesAsync(filters);
                //var demandes = await _demandeRepository.GetDemandesWithFilters(filters);
                return Ok(demandes);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erreur lors de la récupération des demandes: {ex.Message}");
            }
        }

    }
}
