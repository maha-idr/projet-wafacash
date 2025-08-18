using Demande_API.Services;
using Microsoft.AspNetCore.Mvc;

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
    }
}
