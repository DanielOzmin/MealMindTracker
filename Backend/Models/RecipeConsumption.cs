using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models;

public class RecipeConsumption
{
    [Key]
    public Guid Id { get; set; }
    
    [ForeignKey("Recipe")]
    public Guid RecipeId { get; set; }
    public Recipe Recipe { get; set; }
    [Required]
    public double Amount { get; set; }
    [Required]
    public DateTime Date { get; set; } = DateTime.UtcNow;
    
    public double Energy { get; set; }
    public double Protein { get; set; }
    public double Carbohydrates { get; set; }
    public double Fat { get; set; }
    public double Fiber { get; set; }
    public double Magnesium { get; set; }
    public double Sodium { get; set; }
    public double Calcium { get; set; }
    public double Potassium { get; set; }
    public double Iron { get; set; }
    public double Zinc { get; set; }
    
}