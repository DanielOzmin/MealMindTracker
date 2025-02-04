import { useState } from "react";
import Menu from "../Menu/Menu";
import AddRecipe from "../Recipe/AddRecipe";
import './Home.css'
import Settings from "../Settings/Settings";
import Statistics from "../Statistics/Statistics";
import AddWorkout from "../AddWorkout/AddWorkout";
import NutrientsTable from "../NutrientsTable/NutrientsTable";
import { Nutrients } from "../../Services/Nutrients";

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout" | "RecipeNutrients"
type Recipe = {
    title: string,
    ingredients: string[]
}

const Home = () => {
    const [view, setView] = useState<View>("Daily")
    const [recipe, setRecipe] = useState<Recipe>({title: "", ingredients: []})
    const [nutritionInfo, setNutritionInfo] = useState<Nutrients & {id:string, totalWeight: number }>({
        id: "",calories: 0, protein: 0, carbohydrates: 0, fat: 0,
        fiber: 0, magnesium: 0, sodium: 0, calcium: 0, 
        potassium: 0, iron: 0, zinc: 0, totalWeight: 0
    })


    return (
        <div className="AppContainer">
            <div className="ContentRow">
                <Menu view={view} setView={setView} />
                {view == "AddWorkout" && <AddWorkout />}
                {view == "Settings" && <Settings /> }
                {view == "RecipeNutrients" && <NutrientsTable recipe={recipe} nutritionInfo={nutritionInfo}/>}
                {view != "AddWorkout" && view != "Settings" && view!="RecipeNutrients" && <Statistics view={view}/>}
                <AddRecipe setView={setView} setNutritionInfo={setNutritionInfo} setRecipe={setRecipe} recipe={recipe} />
            </div>
        </div>)
}

export default Home