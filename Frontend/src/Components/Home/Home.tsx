import { useState } from "react";
import Menu from "../Menu/Menu";
import AddRecipe from "../Recipe/AddRecipe";
import './Home.css'
import Settings from "../Settings/Settings";
import Statistics from "../Statistics/Statistics";
import AddWorkout from "../AddWorkout/AddWorkout";
import NutrientsTable from "../NutrientsTable/NutrientsTable";
import { Nutrients } from "../../Services/Nutrients";
import MealRecommendation from "../Meals/MealRecommendation";

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout" | "RecipeNutrients" | "MealRecommendation"
type Recipe = {
    title: string,
    ingredients: string[]
}

const Home = () => {
    const [view, setView] = useState<View>("Settings")
    const [recipe, setRecipe] = useState<Recipe>({title: "", ingredients: []})
    const [nutrientDeficit, setNutrientDeficit] = useState<number>(0)
    const [nutritionInfo, setNutritionInfo] = useState<Nutrients & {id:string, totalWeight: number, description?:string }>({
        id: "",energy: 0, protein: 0, carbohydrates: 0, fat: 0,
        fiber: 0, magnesium: 0, sodium: 0, calcium: 0, 
        potassium: 0, iron: 0, zinc: 0, totalWeight: 0, description: ""
    })


    return (
        <div className="AppContainer">
            <div className="ContentRow">
                <Menu view={view} setView={setView} />
                {view == "AddWorkout" && <AddWorkout />}
                {view == "Settings" && <Settings /> }
                {view == "RecipeNutrients" && <NutrientsTable recipe={recipe} nutritionInfo={nutritionInfo}/>}
                {view != "AddWorkout" && view != "Settings" && view!="RecipeNutrients" && view!= "MealRecommendation" && <Statistics view={view} setNutrientDeficit={setNutrientDeficit}/>}
                {view == "MealRecommendation" && <MealRecommendation nutrientDeficit={nutrientDeficit}/>}
                <AddRecipe setView={setView} setNutritionInfo={setNutritionInfo} setRecipe={setRecipe} recipe={recipe} />
            </div>
        </div>)
}

export default Home