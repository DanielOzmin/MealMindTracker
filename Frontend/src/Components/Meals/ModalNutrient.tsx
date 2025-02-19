import { useState } from "react";
import './ModalNutrient.css'

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
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalNutrien = ({ recipe, setShowModal }: RecipeProps) => {
    const [showFullDescription, setShowFullDescription] = useState(false)

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="nutrition-facts">
                    <h2>{recipe.recipeName}</h2>
                    <p className="total-weight">Total Weight: <strong>{recipe.totalWeight}g</strong></p>
                    <hr />
                    <p className="calories"><strong>Calories: {recipe.energy}kcal</strong></p>
                    <hr />

                    <div className="nutrient">
                        <p><strong>Protein</strong> {recipe.protein.toFixed(1)}g</p>
                        <p><strong>Carbohydrates</strong> {recipe.carbohydrates.toFixed(1)}g</p>
                        <p><strong>Fat</strong> {recipe.fat.toFixed(1)}g</p>
                        <p><strong>Fiber</strong> {recipe.fiber.toFixed(1)}g</p>
                    </div>

                    <hr />

                    <div className="nutrient">
                        <p><strong>Magnesium</strong> {recipe.magnesium.toFixed(1)}mg</p>
                        <p><strong>Natrium</strong> {recipe.sodium.toFixed(1)}mg</p>
                        <p><strong>Calcium</strong> {recipe.calcium.toFixed(1)}mg</p>
                        <p><strong>Potassium</strong> {recipe.potassium.toFixed(1)}mg</p>
                        <p><strong>Iron</strong> {recipe.iron.toFixed(1)}mg</p>
                        <p><strong>Zinc</strong> {recipe.zinc.toFixed(1)}mg</p>
                    </div>

                    <hr />
                    {recipe.description && (
                        <div className="description">
                            <p><strong>Preparation:</strong></p>
                            <p>
                                {showFullDescription ? recipe.description : `${recipe.description.substring(0, 100)}...`}
                            </p>
                            {!showFullDescription && (
                                <button className="show-more-btn" onClick={() => setShowFullDescription(true)}>
                                    Show more
                                </button>
                            )}
                        </div>
                    )}

                </div>
                <button className="close-modal" onClick={() => setShowModal(false)}>Back</button>
            </div>
        </div>
    )
}

export default ModalNutrien
