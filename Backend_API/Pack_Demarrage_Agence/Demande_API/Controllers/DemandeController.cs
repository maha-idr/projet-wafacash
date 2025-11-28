using Demande_API.DTO;
using Demande_API.DTOs;
using Demande_API.Services;  // ← assure-toi que ceci est présent
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WorkflowApp.DTOs;

namespace Demande_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DemandeController : ControllerBase
    {
        private readonly IDemandeService _service;
        public DemandeController(IDemandeService service) => _service = service;

        [Authorize(Roles = "Admin")]
        [HttpGet("pending")]
        public async Task<ActionResult<List<DemandeReadDto>>> GetPending(CancellationToken ct)
            => Ok(await _service.GetPendingAsync(ct));

        //[HttpGet("{id:int}")]
        //public async Task<ActionResult<DemandeReadDto>> GetById(int id, CancellationToken ct)
        //{
        //    var d = await _service.GetByIdAsync(id, ct);
        //    return d is null ? NotFound() : Ok(d);
        //}

        //[HttpPut("{id:int}/affectation")]
        //public async Task<IActionResult> UpdateAffectation(int id, [FromBody] UpdateAffectationDto dto, CancellationToken ct)
        //{
        //    var ok = await _service.UpdateAffectationAsync(id, dto, ct);
        //    return ok ? NoContent() : NotFound();
        //}

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
        public async Task<IActionResult> GetDemandeById(int id)
        {
            var demande = await _service.GetDemandeById(id);
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
