import RecipeCard from "./RecipeCard"
import './Meals.css'
import { useEffect, useState } from "react"

type Recipe ={
    id: string,
    recipeName: string,
    totalWeight: number,
    ingredients: string[],
    energy: number,
    protein: number,
    carbohydrates: number,
    fat: number,
    fiber: number,
    magnesium: number,
    sodium: number,
    calcium: number,
    potassium: number,
    iron: number,
    zinc: number,
    description?: string
    image?: string
}

const Meals = () => {
    const [foodName, setFoodName] = useState<string>("")
    const [recipesList, setRecipesList] = useState<Recipe[]>([])
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])

    useEffect(()=>{
        const getAllRecipe = async() => {
            try {
                const response = await fetch("/api/Recipe/getAllRecipes")
                const data: Recipe[] = await response.json()
                const parsedRecipes = data.map(recipe => ({
                    ...recipe,
                    ingredients: typeof recipe.ingredients === "string" 
                    ? JSON.parse(recipe.ingredients) 
                    : recipe.ingredients
                }))
                setRecipesList(parsedRecipes)
                setFilteredRecipes(parsedRecipes)
            } catch (error) {
                console.error("failed to fetch")
            }
        }
        getAllRecipe()
    },[])
   
    useEffect(() => {
        if (!foodName.trim()) {
          setFilteredRecipes(recipesList);
        } else {
          setFilteredRecipes(
            recipesList.filter(r =>
              r.recipeName.toLowerCase().includes(foodName.toLowerCase())
            )
          )
        }
      }, [foodName, recipesList])
    

    return (
        <div className="page-container">
            <div className="meals-container">
                <h1>Meals</h1>
                <input placeholder="search by name" onChange={(e) => setFoodName(e.target.value)} />
                <div className="meals-grid">
                    {filteredRecipes.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Meals