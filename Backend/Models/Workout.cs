using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class Workout
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Calories { get; set; }
    public int Time { get; set; }
    public string WorkoutType { get; set; }
    public DateTime Date { get; set; }
    
    [ForeignKey("User")]
    public Guid UserId { get; set; }
    public User User { get; set; }
}