import NutritionIndex from './NutritionIndex';
import './Statistics.css'

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout";  
type Prop ={
    view: View
}
const Statistics = ({view}:Prop) => {
    return (
        <div className="statistics-container">
      <div className="nutrition-container">
        <h2>{view} Statistics</h2>
        <div className="nutrition-progress">
          <NutritionIndex percentage={75} label="Protein" />
          <NutritionIndex percentage={10} label="Carbs" />
          <NutritionIndex percentage={30} label="Fat" />
        </div>
      </div>
      <div className="nutrition-list-container">
        <h3>Micronutrients:</h3>
        <ul className="nutrition-list">
          <li>Fibre: 35g (100%)</li>
          <li>Magnesium: 400mg (100%)</li>
          <li>Natrium: 1500mg (100%)</li>
          <li>Calcium: 1100mg (100%)</li>
          <li>Potassium: 3800mg (100%)</li>
          <li>Iron: 8mg (100%)</li>
          <li>Zinc: 11mg (100%)</li>
        </ul>
      </div>
    </div>
    )
}
export default Statistics