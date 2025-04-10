namespace Backend.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public int Weight { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public int Height { get; set; }
    public int ActivityLevel { get; set; }

    public List<Workout> Workouts { get; set; } = new List<Workout>();
}