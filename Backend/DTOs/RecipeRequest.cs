namespace Backend.Models;

public class RecipeRequest
{
    public string Title { get; set; }
    public List<string> Ingredients { get; set; }
}