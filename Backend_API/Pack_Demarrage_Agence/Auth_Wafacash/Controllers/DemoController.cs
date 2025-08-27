using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Auth_Wafacash.Controllers;

[ApiController]
[Route("demo")]
public class DemoController : ControllerBase
{
    [HttpGet("saisie")]
    [Authorize(Policy = "CommercialOnly")]
    public IActionResult Saisie() => Ok("Ecran 1 - Saisie (Commercial)");

    [HttpGet("affectation")]
    [Authorize(Policy = "SupportOnly")]
    public IActionResult Affectation() => Ok("Ecran 2 - Affectation (Support_IT)");

    [HttpGet("export")]
    [Authorize]
    public IActionResult Export() => Ok("Ecran 3 - Consultation/Export (All)");
}
