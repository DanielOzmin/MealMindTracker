using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

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
        return NotFound();
    }

    [HttpPost("nutrients")]
    public async Task<IActionResult> GetNutrients([FromBody] RecipeRequest request)
    {
        if (request == null || string.IsNullOrEmpty(request.Title) || request.Ingredients == null || !request.Ingredients.Any())
        {
            return BadRequest("Invalid request data");
        }

        var appId = _configuration["Edamam:ApiId"];
        var appKey = _configuration["Edamam:ApiKey"];
        var url = $"https://api.edamam.com/api/nutrition-details?app_id={appId}&app_key={appKey}";

        var jsonRequest = JsonSerializer.Serialize(new { ingr = request.Ingredients });
        var response = await _httpClient.PostAsync(url, new StringContent(jsonRequest, Encoding.UTF8, "application/json"));
    
        if (!response.IsSuccessStatusCode)
        {
            return StatusCode((int)response.StatusCode, "Error calling external API");
        }

        var content = await response.Content.ReadAsStringAsync();
        var edamamResponse = JsonSerializer.Deserialize<EdamamResponse>(content, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        
        if (edamamResponse == null)
        {
            return BadRequest("Invalid response from API");
        }
        var recipe = new Recipe
        {
            RecipeName = request.Title,
            TotalWeight = edamamResponse.TotalWeight,
            Energy = GetNutrientValue(edamamResponse,"ENERC_KCAL"),
            Protein = GetNutrientValue(edamamResponse, "PROCNT"),
            Carbohydrates = GetNutrientValue(edamamResponse, "CHOCDF"),
            Fat = GetNutrientValue(edamamResponse, "FAT"),
            Fiber = GetNutrientValue(edamamResponse, "FIBTG"),
            Magnesium = GetNutrientValue(edamamResponse, "MG"),
            Sodium = GetNutrientValue(edamamResponse, "NA"),
            Calcium = GetNutrientValue(edamamResponse, "CA"),
            Potassium = GetNutrientValue(edamamResponse, "K"),
            Iron = GetNutrientValue(edamamResponse, "FE"),
            Zinc = GetNutrientValue(edamamResponse, "ZN")
        };
        recipe.SetIngredients(request.Ingredients);
        return Ok(recipe);
    }
    
    private double GetNutrientValue(EdamamResponse response, string key)
    {
        return response.TotalNutrients != null && response.TotalNutrients.ContainsKey(key)
            ? response.TotalNutrients[key].quantity
            : 0; 
    }
    
    
    
}