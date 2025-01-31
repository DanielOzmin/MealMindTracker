import { useState } from "react";
import Menu from "../Menu/Menu";
import AddRecipe from "../Recipe/AddRecipe";
import './Home.css'
import Settings from "../Settings/Settings";
import Statistics from "../Statistics/Statistics";
import AddWorkout from "../AddWorkout/AddWorkout";

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout"

const Home = () => {
    const [view, setView] = useState<View>("Daily")


    return (
        <div className="AppContainer">
            <div className="ContentRow">
                <Menu view={view} setView={setView} />
                {view == "AddWorkout" && <AddWorkout />}
                {view == "Settings" && <Settings /> }
                {view != "AddWorkout" && view != "Settings" && <Statistics view={view}/>}
                <AddRecipe />
            </div>
        </div>)
}

export default Home