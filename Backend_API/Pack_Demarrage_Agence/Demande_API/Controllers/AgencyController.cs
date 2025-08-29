// Controllers/AgencyController.cs
using Microsoft.AspNetCore.Mvc;
using YourProject.Data;   // le DbContext
using YourProject.Models; // le modèle Agency

[Route("api/[controller]")]
[ApiController]
public class AgencyController : ControllerBase
{
    private readonly AppDbContext _context;

    public AgencyController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> CreateAgency([FromBody] Agency agency)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        _context.Agencies.Add(agency);
        await _context.SaveChangesAsync();

        return Ok(agency);
    }
}
