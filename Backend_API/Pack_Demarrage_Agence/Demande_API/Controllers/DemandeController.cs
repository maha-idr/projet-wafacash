using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Demande_API.DTO;
using Demande_API.Services;  // ← assure-toi que ceci est présent
using Microsoft.AspNetCore.Mvc;

namespace Demande_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DemandeController : ControllerBase
    {
        private readonly IDemandeService _service;
        public DemandeController(IDemandeService service) => _service = service;

        [HttpGet("pending")]
        public async Task<ActionResult<List<DemandeReadDto>>> GetPending(CancellationToken ct)
            => Ok(await _service.GetPendingAsync(ct));

        [HttpGet("{id:int}")]
        public async Task<ActionResult<DemandeReadDto>> GetById(int id, CancellationToken ct)
        {
            var d = await _service.GetByIdAsync(id, ct);
            return d is null ? NotFound() : Ok(d);
        }

        [HttpPut("{id:int}/affectation")]
        public async Task<IActionResult> UpdateAffectation(int id, [FromBody] UpdateAffectationDto dto, CancellationToken ct)
        {
            var ok = await _service.UpdateAffectationAsync(id, dto, ct);
            return ok ? NoContent() : NotFound();
        }
    }
}
