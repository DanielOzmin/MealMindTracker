import { useState } from "react";
import './Meals.css'

type RecipeProps = {
    recipe: {
        name: string,
        ingredients: string[],
        image: string
    }
}
//nem edit lesz hanem check nutrients 
const RecipeCard = ({ recipe }: RecipeProps) => {
    const [edit, setEdit] = useState<boolean>(false)

    return (
        <div className="recipe-card">
            <h2>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} width="150" />
            {/*Ide jön még kcal - protein - carb - fat */}
            {recipe.ingredients.map((ingredient, index) => (
                <p key={index}>
                    {ingredient.split(" ")[0]} - {ingredient.split(" ")[1]}
                </p>
            ))}
            <div className="button-group">
                {edit ? (
                    <button onClick={() => setEdit(false)}>Save</button>
                ) : (
                    <button onClick={() => setEdit(true)}>Edit</button>
                )}
                <button>Eaten today</button>
            </div>
        </div>
    )
}

export default RecipeCard