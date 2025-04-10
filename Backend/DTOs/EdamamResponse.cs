using Backend.Models;

namespace Backend.DTOs;

public class EdamamResponse
{
    public double TotalWeight { get; set; }
    public Dictionary<string, NutrientInfo> TotalNutrients { get; set; }
}