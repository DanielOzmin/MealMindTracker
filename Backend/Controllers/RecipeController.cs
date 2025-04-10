using Backend.Data;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class RecipeController :ControllerBase
{
    private readonly AppDbContext _context;
    private readonly S3Service _s3Service;

    public RecipeController(AppDbContext context, S3Service s3Service)
    {
        _context = context;
        _s3Service = s3Service; 
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
        var recipes = await _context.Recipes.ToListAsync();
        return Ok(recipes);
    }

    [HttpPost("uploadImage")]
    public async Task<IActionResult> UploadImage(Guid id, IFormFile file)
    {
        try
        {
            string imageUrl = await _s3Service.UploadFileAsync(file);
            var recipe = await _context.Recipes.FindAsync(id);
            if (recipe == null)
            {
                return BadRequest("Recipe not found");
            }
            recipe.Image = imageUrl;
            _context.Recipes.Update(recipe);
            await _context.SaveChangesAsync();
            return Ok(new { imageUrl });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
    
    
    
    
}