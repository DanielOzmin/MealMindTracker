import { useState } from "react";
import './Meals.css'
import './RecipeCard.css'
import ModalNutrien from "./ModalNutrient";


type Recipe = {
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
}
type RecipeProps = {
    recipe: Recipe
}

const RecipeCard = ({ recipe }: RecipeProps) => {
    const [showModal, setShowModal] = useState<boolean>(false)
    const [showAmoutInput, setShowAmountInput] = useState<boolean>(false)
    const [amount, setAmount] = useState<number>()
    const [showAllIngredients, setShowAllIngredients] = useState(false)

    const handleSetAmount = async () => {
        if (!amount || amount <= 0) return alert("Give valid amount")
        setShowAmountInput(false)
        const consumptionData = {
            recipeId: recipe.id,
            amount: amount
        }
        try {
            const response = await fetch("/api/RecipeConsumption/consume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(consumptionData)
            })
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`)
            }
            const data = await response.json()
            setAmount(0)
            alert(data.message)
        } catch (error) {
            console.error("failed to fetch")
            alert("Sending data doesnt work try again later!")
        }

    }

    return (
        <>
            <div className="recipe-card">
                <h2>{recipe.recipeName}</h2>

                {recipe.ingredients.slice(0, showAllIngredients ? recipe.ingredients.length : 3).map((ingredient, index) => (
                    <p key={index}>
                        {ingredient}
                    </p>
                ))}

                {recipe.ingredients.length > 3 && !showAllIngredients && (
                    <button className="see-more-btn" onClick={() => setShowAllIngredients(true)}>
                        See more
                    </button>
                )}

                <div className="button-group">
                    <button onClick={() => setShowModal(true)}>Nutrients</button>
                    <button onClick={() => setShowAmountInput(true)}>Eaten today</button>
                    {showAmoutInput && (
                        <div>
                            <input type="number" placeholder="example 100g" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                            <button onClick={handleSetAmount}>Set amount</button>
                        </div>)}
                </div>
            </div>

            {showModal && <ModalNutrien recipe={recipe} setShowModal={setShowModal} />}
        </>

    )
}

export default RecipeCard