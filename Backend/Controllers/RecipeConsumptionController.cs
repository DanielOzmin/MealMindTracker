using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

public class RecipeConsuptionController
{
    private readonly AppDbContext _context;

    public RecipeConsuptionController(AppDbContext context)
    {
        _context = context;
    }
    
    // calculate by period (daily, weekly, monthly, alltime)
    // nutrients eaten by totalweight
    [HttpPost("consume")]
    public async Task<IActionResult> Consume([FromBody] RecipeConsuption recipe)
}