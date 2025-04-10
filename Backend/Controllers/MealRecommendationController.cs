using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MealRecommendationController : ControllerBase
{
    private readonly string _openAiApiKey;
    private readonly HttpClient _httpClient;

    public MealRecommendationController(IConfiguration config)
    {
        _openAiApiKey = config["OpenAI:ApiKey"];
        _httpClient = new HttpClient();
    }

    [HttpPost("mealsRecommendation")]
    public async Task<IActionResult> RecommendMeal([FromBody] AiRequest mealrequest)
    {
        var prompt = $@"
            Generate a meal recipe in JSON format with these fields:
            - RecipeName (string)
            - TotalWeight (number, in grams)
            - Ingredients (array of strings)
            - Energy (number, in kcal)
            - Protein (number, in grams)
            - Carbohydrates (number, in grams)
            - Fat (number, in grams)
            - Fiber (number, in grams)
            - Magnesium (number, in mg)
            - Sodium (number, in mg)
            - Calcium (number, in mg)
            - Potassium (number, in mg)
            - Iron (number, in mg)
            - Zinc (number, in mg)
            - Description (string, short cooking steps)

            Use only metric measurements and make sure all numerical values are in number format (not as strings). 
            If some values are unknown, return 0 instead of leaving them empty.";


        var payload = new
        {
            model = "gpt-4o",
            response_format = new { type = "json_object" },
            messages = new[]
            {
                new
                {
                    role = "system",
                    content =
                        $"You are a nutritionist AI that suggests meals that fit {mealrequest.Wish} while ensuring the total calories do not exceed the nutrient deficit {mealrequest.NutrientDeficit} kcal. However, if the deficit is too high, suggest a reasonable portion size that aligns with balanced meal planning. Provide the response in structured JSON format."
                },
                new { role = "user", content = prompt }
            }
        };

        var requestJson = JsonSerializer.Serialize(payload);
        var httpContent = new StringContent(requestJson, Encoding.UTF8, "application/json");

        var request = new HttpRequestMessage(HttpMethod.Post, "https://api.openai.com/v1/chat/completions")
        {
            Content = httpContent
        };
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", _openAiApiKey);

        var response = await _httpClient.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();

        var root = JsonDocument.Parse(responseContent).RootElement;
        var reciperecommendation = root
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        var aiRecipeResponseDto = JsonSerializer.Deserialize<AiResponse>(reciperecommendation, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        });

        return Ok(aiRecipeResponseDto);
    }
}