import './Menu.css'
import { useNavigate } from 'react-router-dom'

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout"
type Props = {
    view: View
    setView: React.Dispatch<React.SetStateAction<View>>
}

const Menu = ({ view, setView }: Props) => {
    const navigate = useNavigate()

    const handleMealsClick = () => {
        navigate('/meals')
    }
    return (
        <div className="Menu">
            <h3>MealMindTracker</h3>
            <ul className="MenuList">
                <li className={`MenuItem ${view == "Daily" ? "active" : ""}`} onClick={() => setView("Daily")}>Daily</li>
                <li className={`MenuItem ${view == "Weekly" ? "active" : ""}`} onClick={() => setView("Weekly")}>Weekly</li>
                <li className={`MenuItem ${view == "Monthly" ? "active" : ""}`} onClick={() => setView("Monthly")}>Monthly</li>
                <li className={`MenuItem ${view == "AllTime" ? "active" : ""}`} onClick={() => setView("AllTime")}>All Time</li>
                <li className={`MenuItem ${view == "AddWorkout" ? "active" : ""}`} onClick={() => setView("AddWorkout")}>Add Workout</li>
                <li className={`MenuItem ${view == "Settings" ? "active" : ""}`} onClick={() => setView("Settings")}>Personal Data</li>
                <li className="MenuItem" onClick={handleMealsClick}>Meals</li>
            </ul>
        </div>
    )
}

export default Menu