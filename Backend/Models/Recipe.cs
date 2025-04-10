using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace Backend.Models;

public class Recipe
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string RecipeName { get; set; }
    public double TotalWeight { get; set; }
    [Column(TypeName = "nvarchar(max)")]
    public string Ingredients { get; set; }
    
    public double Energy { get; set; }
    public double  Protein { get; set; }
    public double  Carbohydrates { get; set; }
    public double  Fat { get; set; }
    public double  Fiber { get; set; }
    public double  Magnesium { get; set; }
    public double Sodium { get; set; }
    public double  Calcium { get; set; }
    public double  Potassium { get; set; }
    public double  Iron { get; set; }
    public double  Zinc { get; set; }
    public string? Description { get; set; }
    public string? Image { get; set; }
    
    
    public void SetIngredients(List<string> ingredients)
    {
        Ingredients = JsonSerializer.Serialize(ingredients);
    }

    public List<string> GetIngredients()
    {
        return Ingredients != null ? JsonSerializer.Deserialize<List<string>>(Ingredients) : new List<string>();
    }
}