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

        [HttpPost]
        public IActionResult CreateDemande([FromBody] DemandeCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var demande = _service.CreateDemande(dto);
            return Ok(new { message = "Demande enregistrée !", demandeId = demande.Id });
        }

        [HttpGet]
        public IActionResult GetDemandes() => Ok(_service.GetAllDemandes());

        [HttpGet("{id}")]
        public IActionResult GetDemandeById(int id)
        {
            var demande = _service.GetDemandeById(id);
            if (demande == null) return NotFound(new { message = "Demande non trouvée" });
            return Ok(demande);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateDemande(int id, [FromBody] DemandeUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var updated = _service.UpdateDemande(id, dto);
            if (!updated) return NotFound(new { message = "Demande non trouvée" });

            return Ok(new { message = "Demande mise à jour !" });
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteDemande(int id)
        {
            var deleted = _service.DeleteDemande(id);
            if (!deleted) return NotFound(new { message = "Demande non trouvée" });

            return Ok(new { message = "Demande supprimée !" });
        }

    }
}
