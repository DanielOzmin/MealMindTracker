import { useState } from 'react'
import './MealRecommendation.css'

type Recipe = {
    recipeName: string;
    totalWeight: number;
    ingredients: string[];
    energy: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    magnesium: number;
    sodium: number;
    calcium: number;
    potassium: number;
    iron: number;
    zinc: number;
    description: string;
}
type Props={
    nutrientDeficit: number
}

const MealRecommendation = ({nutrientDeficit} : Props) => {
    const [input, setInput] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [recipe, setRecipe] = useState<Recipe | null>(null)

    const handleClick = async () => {
        setLoading(true)
        setRecipe(null)
        const request = { Wish: input, NutrientDeficit: nutrientDeficit}
        try {
            const response = await fetch("/api/MealRecommendation/mealsRecommendation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({request})
            })
            if (!response.ok) {
                throw new Error("Somthing go wrong while fetching data")
            }
            const data: Recipe = await response.json()
            setRecipe(data)
            console.log(data)
        } catch (error) {
            console.error({ message: error })
        } finally {
            setLoading(false)
        }
    }
    
    const handleAddMeals = async () => {
        const fullRecipe = {
            RecipeName: recipe?.recipeName,
            TotalWeight: recipe?.totalWeight,
            Ingredients: JSON.stringify(recipe?.ingredients),
            Energy: recipe?.energy,
            Protein: recipe?.protein,
            Carbohydrates: recipe?.carbohydrates,
            Fat: recipe?.fat,
            Fiber: recipe?.fiber,
            Magnesium: recipe?.magnesium,
            Sodium: recipe?.sodium,
            Calcium: recipe?.calcium,
            Potassium: recipe?.potassium,
            Iron: recipe?.iron,
            Zinc: recipe?.zinc,
            Description: recipe?.description
        }

        try {
            const response = await fetch("/api/Recipe/addRecipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullRecipe)
            })

            if (!response.ok) {
                throw new Error("Failed to save recipe")
            }

            const data = await response.json()
            alert("Recipe added to the meals")
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="meal-recommendation-container">
            <h2>Meal Recommendation</h2>
            <div className="input-group">
                <label htmlFor="special-demand">Special demand:</label>
                <input
                    id="special-demand"
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Example: I'm veggie or I prefer beef"
                />
            </div>
            <button className="recommend-btn" onClick={handleClick} disabled={loading}>
                {loading ? <div className="spinner"></div> : "Get new recipe"}
            </button>

            {loading && <p>Loading recipe...</p>}

            {recipe ? (
                <div className="recipe-card">
                    <h3>{recipe.recipeName}</h3>
                    <p><strong>Ingredients:</strong></p>
                    <ul>
                        {recipe?.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <p><strong>Energy:</strong> {recipe.energy} kcal</p>
                    <p><strong>Protein:</strong> {recipe.protein} g</p>
                    <p><strong>Carbohydrates:</strong> {recipe.carbohydrates} g</p>
                    <p><strong>Fat:</strong> {recipe.fat} g</p>
                    <p><strong>Description:</strong> {recipe.description}</p>
                    <button onClick={handleAddMeals}>Add to meals</button>
                </div>
            ) : (
                !loading && <div>No recipe available</div>
            )}
        </div>
    )
}

export default MealRecommendation