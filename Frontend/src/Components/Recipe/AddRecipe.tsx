import { useState } from "react"
import './AddRecipe.css'
import { Nutrients } from "../../Services/Nutrients"

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout" | "RecipeNutrients"
type Recipe = {
  title: string,
  ingredients: string[]
}

type NutrientsProp = {
  setView: React.Dispatch<React.SetStateAction<View>>
  setNutritionInfo: React.Dispatch<React.SetStateAction<Nutrients & {id: string, totalWeight: number}>>
  setRecipe: React.Dispatch<React.SetStateAction<Recipe>>
  recipe: Recipe
}

const AddRecipe = ({setView,setNutritionInfo,setRecipe,recipe}: NutrientsProp ) => {
  

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const lines = value.split("\n")
    setRecipe(prev => ({...prev,ingredients: lines}))
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipe(prev => ({ ...prev, title: e.target.value }))
  }

  const handleAddRecipe = async(e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/Nutrient/nutrients", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({title: recipe.title, ingredients: recipe.ingredients})
      })
      const data = await response.json()
      console.log(data)
      setNutritionInfo(data)
    } catch (error) {
      console.log(error)
    }
    setView("RecipeNutrients")
  }

  return (
    <div className="add-recipe-container">
      <form className="add-recipe-form" onSubmit={handleAddRecipe}>
        <h2>Add Recipe</h2>

        <div className="form-group">
          <label htmlFor="meal-name">Meal Name:</label>
          <input
            type="text"
            id="meal-name"
            value={recipe.title}
            onChange={handleNameChange}
            placeholder="Meal name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            rows={10}
            value={recipe.ingredients.join("\n")}
            onChange={handleText}
            placeholder="Example: 135g chicken"
            required
          ></textarea>
        </div>

        <button className="submit-btn">Get nutrient info</button>
      </form>
    </div>)
}

export default AddRecipe