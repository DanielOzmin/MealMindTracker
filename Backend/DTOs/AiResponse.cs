namespace Backend.DTOs;

public class AiResponse
{
    public string RecipeName { get; set; }
    public double TotalWeight { get; set; }
    public List<string> Ingredients { get; set; }
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
    public string Description { get; set; }
}