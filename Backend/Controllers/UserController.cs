using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("personalData")]
    public async Task<IActionResult> CreatePersonalData([FromBody] PersonalDataRequest request){
        var user = await _context.Users.FirstOrDefaultAsync();

        if (user == null)
        {
            user = new User
            {
                Weight = request.Weight,
                Age = request.Age,
                Gender = request.Gender,
                Height = request.Height,
                ActivityLevel = request.ActivityLevel
            };

            await _context.Users.AddAsync(user);
        }
        else
        {
            user.Weight = request.Weight;
            user.Age = request.Age;
            user.Gender = request.Gender;
            user.Height = request.Height;
            user.ActivityLevel = request.ActivityLevel;

            _context.Users.Update(user);
        }
        
        await _context.SaveChangesAsync();

        return Ok(new { message = "Personal data saved successfully", user });
    }

    [HttpGet("getPersonalData")]
    public async Task<IActionResult> GetPersonalData()
    {
        var personalData = await _context.Users.ToListAsync();
        return Ok(personalData[0]);
    }

}