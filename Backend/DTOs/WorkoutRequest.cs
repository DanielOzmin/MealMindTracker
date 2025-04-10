namespace Backend.DTOs;

public class WorkoutRequest
{
    public Guid Id { get; set; }
    public int Calories { get; set; }
    public int Time { get; set; }
    public string WorkoutType { get; set; }
    public DateTime Date { get; set; }
}