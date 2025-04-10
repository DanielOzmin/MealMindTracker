namespace Backend.DTOs;

public class ConsumptionRequest
{
    public Guid RecipeId { get; set; }
    public int Amount { get; set; }
}