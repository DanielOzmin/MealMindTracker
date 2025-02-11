using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class RecipeControllers :ControllerBase
{
    private readonly AppDbContext _context;

    public RecipeControllers(AppDbContext context)
    {
        _context = context;
    }
    // get nutrientInfo (get, calculate)v
    // delete recipe (delete)
    [HttpPost("addRecipe")]
    public async Task<IActionResult> AddRecipe([FromBody] Recipe recipe)
    {
        recipe.SetIngredients(recipe.GetIngredients());
        _context.Recipes.Add(recipe);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Recipe saved to database", recipeId = recipe.Id });
    }

    [HttpGet("getAllRecipes")]
    public async Task<IActionResult> GetAllRecipes()
    {
        List<Recipe> recipes = new List<Recipe>();
        foreach (var r in _context.Recipes)
        {
            recipes.Add(r);
        }
        return Ok(recipes);
    }
    
    
    
    
}