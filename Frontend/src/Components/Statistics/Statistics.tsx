import NutritionIndex from './NutritionIndex';
import './Statistics.css'
import { Nutrients, NutrientsContext } from '../../Services/Nutrients';
import { useContext, useState } from 'react';

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout" | "RecipeNutrients"
type Prop = {
  view: View
}
const Statistics = ({ view }: Prop) => {
  const nutrientsContext = useContext(NutrientsContext)
  const [current, setCurrent] = useState<Nutrients>({
    calories: 300, protein: 55, carbohydrates: 100, fat: 10, fiber: 0, magnesium: 0, sodium: 0, calcium: 0, potassium: 0, iron: 0, zinc: 0
  })

  if (!nutrientsContext) {
    throw new Error("Some error with nutrients")
  }

  const { nutrients } = nutrientsContext

  const getPercentage = (a?: number, b?: number) => {
    if (!b || b === 0) return 0
    return Number(((a ?? 0) / b * 100).toFixed(1))
  }

  const getDaysInMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  }

  const getMultiplier = () => {
    switch (view) {
      case "Daily": return 1;
      case "Weekly": return 7;
      case "Monthly": return getDaysInMonth();
      default: return 1;
    }
  }
  const multiplier = getMultiplier()
  


  return (
    <div className="statistics-container">
      <div className="nutrition-container">
        <h2>{view} Statistics</h2>
        <div className="nutrition-progress">
          <NutritionIndex percentage={getPercentage(current?.protein, nutrients?.protein)} label="Protein" />
          <NutritionIndex percentage={getPercentage(current?.carbohydrates, nutrients?.carbohydrates)} label="Carbs" />
          <NutritionIndex percentage={getPercentage(current?.fat, nutrients?.fat)} label="Fat" />
        </div>
      </div>

      <div className="nutrition-list-container">
        <h3>Macronutrients:</h3>
        <ul className="nutrition-list">
          <li>Calories: {((nutrients?.calories ?? 0) * multiplier).toFixed(0)} / {current?.calories} kcal</li>
          <li>Protein: {((nutrients?.protein ?? 0) * multiplier).toFixed(1)} / {current?.protein} g</li>
          <li>Carb: {((nutrients?.carbohydrates ?? 0) * multiplier).toFixed(1)} / {current?.carbohydrates} g</li>
          <li>Fat: {((nutrients?.fat ?? 0) * multiplier).toFixed(1)} / {current?.fat} g</li>
        </ul>

        <h3>Micronutrients</h3>
        <ul className="nutrition-list">
          <li>Fibre: {current?.fiber ?? 0}g ({getPercentage(current?.fiber ?? 0, (nutrients?.fiber ?? 0) * multiplier)}%)</li>
          <li>Magnesium: {current?.magnesium}mg ({getPercentage(current?.magnesium, nutrients?.magnesium ?? 0 * multiplier)}%)</li>
          <li>Natrium: {current?.sodium}mg ({getPercentage(current?.sodium, nutrients?.sodium ?? 0 * multiplier)}%)</li>
          <li>Calcium: {current?.calcium}mg ({getPercentage(current?.calcium, nutrients?.calcium ?? 0 * multiplier)}%)</li>
          <li>Potassium: {current?.potassium}mg ({getPercentage(current?.potassium, nutrients?.potassium ?? 0 * multiplier)}%)</li>
          <li>Iron: {current?.iron}mg ({getPercentage(current?.iron, nutrients?.iron ?? 0 * multiplier)}%)</li>
          <li>Zinc: {current?.zinc}mg ({getPercentage(current?.zinc, nutrients?.zinc ?? 0 * multiplier)}%)</li>
        </ul>
      </div>
    </div>
  )
}
export default Statistics