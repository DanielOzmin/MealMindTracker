using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class RecipeConsumptionController : ControllerBase
{
    private readonly AppDbContext _context;

    public RecipeConsumptionController(AppDbContext context)
    {
        _context = context;
    }
    
    [HttpPost("consume")]
    public async Task<IActionResult> Consume([FromBody] ConsumptionRequest request)
    {
        var recipe = await _context.Recipes.FindAsync(request.RecipeId);
        if (recipe == null)
        {
            return NotFound($"Recipe not found");
        }
        var multiplier = request.Amount / recipe.TotalWeight;
        
        var consumption = new RecipeConsumption
        {
            RecipeId = request.RecipeId,
            Amount = request.Amount,
            Date = DateTime.UtcNow,
            Energy = recipe.Energy * multiplier,
            Protein = recipe.Protein * multiplier,
            Carbohydrates = recipe.Carbohydrates * multiplier,
            Fat = recipe.Fat * multiplier,
            Fiber = recipe.Fiber * multiplier,
            Magnesium = recipe.Magnesium * multiplier,
            Sodium = recipe.Sodium * multiplier,
            Calcium = recipe.Calcium * multiplier,
            Potassium = recipe.Potassium * multiplier,
            Iron = recipe.Iron * multiplier,
            Zinc = recipe.Zinc * multiplier
        };
        _context.RecipeConsuptions.Add(consumption);
        await _context.SaveChangesAsync();
        
        return Ok(new { message = "Recipe consumed" });
    }

    [HttpGet("getByPeriod")]
    public async Task<IActionResult> GetByPeriod([FromQuery] string view)
    {
        DateTime startingDate;
        switch (view)
        {
            case "Daily":
                startingDate = DateTime.UtcNow.Date;
                break;
            case "Weekly":
                startingDate = DateTime.UtcNow.AddDays(-7);
                break;
            case "Monthly":
                startingDate = DateTime.UtcNow.AddMonths(-1);
                break;
            case "AllTime":
                startingDate = DateTime.MinValue;
                break;
            default:
                startingDate = DateTime.UtcNow.Date;
                break;
        }
        
        var allStats = await _context.RecipeConsuptions
            .Where(c => c.Date >= startingDate).ToListAsync();

        var aggregatedStats = new
        {
            energy = allStats.Sum(c => c.Energy),
            protein = allStats.Sum(c => c.Protein),
            carbohydrates = allStats.Sum(c => c.Carbohydrates),
            fat = allStats.Sum(c => c.Fat),
            fiber = allStats.Sum(c => c.Fiber),
            magnesium = allStats.Sum(c => c.Magnesium),
            sodium = allStats.Sum(c => c.Sodium),
            calcium = allStats.Sum(c => c.Calcium),
            potassium = allStats.Sum(c => c.Potassium),
            iron = allStats.Sum(c => c.Iron),
            zinc = allStats.Sum(c => c.Zinc)
        };
        
        return Ok(aggregatedStats);
    }
}