import RecipeCard from "./RecipeCard"
import './Meals.css'
import { useEffect, useState } from "react"


const recipes = [
    {
        name: "Chicken Rice",
        ingredients: ["100g rice", "150g chicken", "2g pepper", "5g salt"],
        image: "/images/chicken.jpg"
    },
    {
        name: "Pasta Bolognese",
        ingredients: ["200g pasta", "100g beef", "50g tomato sauce", "5g garlic"],
        image: "/images/pasta.jpg"
    },
    {
        name: "Omelette",
        ingredients: ["3 eggs", "50g cheese", "5g butter", "2g salt"],
        image: "/images/omlette.jpg"
    },
    {
        name: "Salad",
        ingredients: ["100g lettuce", "50g cucumber", "20g feta cheese", "5g olive oil"],
        image: "/images/salad.jpg"
    },
    {
        name: "Chicken Rice",
        ingredients: ["100g rice", "150g chicken", "2g pepper", "5g salt"],
        image: "/images/chicken.jpg"
    },
    {
        name: "Pasta Bolognese",
        ingredients: ["200g pasta", "100g beef", "50g tomato sauce", "5g garlic"],
        image: "/images/pasta.jpg"
    },
    {
        name: "Omelette",
        ingredients: ["3 eggs", "50g cheese", "5g butter", "2g salt"],
        image: "/images/omlette.jpg"
    },
    {
        name: "Salad",
        ingredients: ["100g lettuce", "50g cucumber", "20g feta cheese", "5g olive oil"],
        image: "/images/salad.jpg"
    },
    {
        name: "Chicken Rice",
        ingredients: ["100g rice", "150g chicken", "2g pepper", "5g salt"],
        image: "/images/chicken.jpg"
    },
]
const Meals = () => {
    const [foodName, setFoodName] = useState<string>("")
    const [recipesList, setRecipesList] = useState(recipes)


    useEffect(() => {
        const filteredRecipes = recipesList.filter((r) => r.name.toLowerCase().includes(foodName.toLowerCase()))
        setRecipesList(filteredRecipes)
        if (foodName === "") setRecipesList(recipes)
    }, [foodName])
    console.log(foodName)

    return (
        <div className="page-container">
            <div className="meals-container">
                <h1>Meals</h1>
                <input placeholder="search by name" onChange={(e) => setFoodName(e.target.value)} />
                <div className="meals-grid">
                    {recipesList.map((recipe, index) => (
                        <RecipeCard key={index} recipe={recipe} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Meals