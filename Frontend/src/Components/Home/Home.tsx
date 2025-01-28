import { useState } from "react";
import Menu from "../Menu/Menu";
import AddRecipe from "../Recipe/AddRecipe";
import './Home.css'
import Settings from "../Settings";
import Statistics from "../Statistics/Statistics";

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout"  

const Home = () => {
    const [view, setView] = useState<View>("Daily")

    console.log(view)
    return (
        <div className="AppContainer">
            <Menu view={view} setView={setView}/>
            <div>
                {view == "Settings" ? <Settings /> : <Statistics view={view}/>}
            </div>
            <div className="ContentContainer">
                <AddRecipe />
            </div>
            
        </div>)
}

export default Home