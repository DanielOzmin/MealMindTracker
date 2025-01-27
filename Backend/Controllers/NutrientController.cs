using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class NutrientController : ControllerBase
{
    private readonly IConfiguration _configuration;
    private readonly HttpClient _httpClient;

    public NutrientController(IConfiguration configuration, HttpClient httpClient)
    {
        _configuration = configuration;
        _httpClient = httpClient;
    }
    [HttpGet("test")]
    public async Task<IActionResult> GetTest()
    {
        return Ok(new {Message="working"});
    }

    [HttpGet("nutrients")]
    public async Task<IActionResult> GetNutrients([FromQuery] string name, [FromQuery] string quantity)
    {
        var appId = _configuration["Edamam:ApiId"];
        var appKey = _configuration["Edamam:ApiKey"];
        var url = $"https://api.edamam.com/api/nutrition-data?app_id={appId}&app_key={appKey}&ingr={quantity}%20{name}";
        
        var response = await _httpClient.GetAsync(url);
        var content = await response.Content.ReadAsStringAsync();
        
        return Ok(content);
    }
    
    
}