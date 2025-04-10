using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class WorkoutController : ControllerBase
{
    private readonly AppDbContext _context;

    public WorkoutController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("addWorkout")]
    public async Task<IActionResult> AddWorkout([FromBody] WorkoutRequest request)
    {
        var user = await _context.Users.FirstOrDefaultAsync();
    
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }
        
        var workout = new Workout
        {
            Id = Guid.NewGuid(),
            Calories = request.Calories,
            Time = request.Time,
            WorkoutType = request.WorkoutType,
            Date = request.Date,
            UserId = user.Id,
            User = user
        };
        user.Workouts.Add(workout);
        _context.Workouts.Add(workout);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Workout added successfully" });
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

        var allWorkout = await _context.Workouts
            .Where(c => c.Date >= startingDate).ToListAsync();
        var result = allWorkout.Sum(w => w.Calories);
        
        return Ok(result);
    }
}