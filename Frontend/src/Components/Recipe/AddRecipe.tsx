import { useState } from "react"
import './AddRecipe.css'

const AddRecipe = () => {
  const [recipeName, setRecipeName] = useState<string>("")
  const [ingredients, setIngedients] = useState<string[]>([])

  const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const lines = value.split("\n")
    setIngedients(lines)
  }

  const handleAddRecipe = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    console.log(recipeName)
    ingredients.forEach((ing) => console.log(ing))
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
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            placeholder="Meal name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            rows={10}
            value={ingredients.join("\n")}
            onChange={handleText}
            placeholder="Example: 135g chicken"
            required
          ></textarea>
        </div>

        <button className="submit-btn">Add Recipe</button>
      </form>
    </div>)
}

export default AddRecipe