import { Recipe } from '../../Services/User'
import './NutirentsTable.css'
import { Nutrients } from '../../Services/Nutrients'

type Props = {
    recipe: Recipe
    nutritionInfo: Nutrients & { id: string, totalWeight: number, description?: string}
}

const NutrientsTable = ({ recipe, nutritionInfo }: Props) => {

    const handleAddMeals = async () => {
        const fullRecipe = {
            RecipeName: recipe.title,
            TotalWeight: nutritionInfo.totalWeight,
            Ingredients: JSON.stringify(recipe.ingredients),
            Energy: nutritionInfo.energy,
            Protein: nutritionInfo.protein,
            Carbohydrates: nutritionInfo.carbohydrates,
            Fat: nutritionInfo.fat,
            Fiber: nutritionInfo.fiber,
            Magnesium: nutritionInfo.magnesium,
            Sodium: nutritionInfo.sodium,
            Calcium: nutritionInfo.calcium,
            Potassium: nutritionInfo.potassium,
            Iron: nutritionInfo.iron,
            Zinc: nutritionInfo.zinc,
            Description: nutritionInfo?.description
        }

        try {
            const response = await fetch("/api/Recipe/addRecipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullRecipe)
            })

            if (!response.ok) {
                throw new Error("Failed to save recipe");
            }

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="nutrition-facts">
            <h2>{recipe.title}</h2>
            <p className="total-weight">Total Weight: <strong>{nutritionInfo.totalWeight}g</strong></p>
            <hr />
            <p className="calories"><strong>Calories: {nutritionInfo.energy}kcal</strong></p>
            <hr />

            <div className="nutrient">
                <p><strong>Protein</strong> {nutritionInfo.protein.toFixed(1)}g</p>
                <p><strong>Carbohydrates</strong> {nutritionInfo.carbohydrates.toFixed(1)}g</p>
                <p><strong>Fat</strong> {nutritionInfo.fat.toFixed(1)}g</p>
                <p><strong>Fiber</strong> {nutritionInfo.fiber.toFixed(1)}g</p>
            </div>

            <hr />

            <div className="nutrient">
                <p><strong>Magnesium</strong> {nutritionInfo.magnesium.toFixed(1)}mg</p>
                <p><strong>Natrium</strong> {nutritionInfo.sodium.toFixed(1)}mg</p>
                <p><strong>Calcium</strong> {nutritionInfo.calcium.toFixed(1)}mg</p>
                <p><strong>Potassium</strong> {nutritionInfo.potassium.toFixed(1)}mg</p>
                <p><strong>Iron</strong> {nutritionInfo.iron.toFixed(1)}mg</p>
                <p><strong>Zinc</strong> {nutritionInfo.zinc.toFixed(1)}mg</p>
            </div>
                <p>{nutritionInfo.description}</p>

            <hr />

            <button className="add-to-meals-btn" onClick={handleAddMeals}>Add to Meals</button>
        </div>
    )
}
export default NutrientsTable