import NutritionIndex from './NutritionIndex';
import './Statistics.css'
import { Nutrients, NutrientsContext } from '../../Services/Nutrients';
import { useContext, useState } from 'react';

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout";
type Prop = {
  view: View
}
const Statistics = ({ view }: Prop) => {
  const nutrientsContext = useContext(NutrientsContext)
  const [current, setCurrent] = useState<Nutrients>({
    macroNutrients: { calories: 0, protein: 0, carb: 0, fat: 0 },
    microNutrients: { fibre: 0, magnesium: 0, natrium: 0, calcium: 0, potassium: 0, iron: 0, zinc: 0 }
  })

  if (!nutrientsContext) {
    throw new Error("Some error with nutrients")
  }
  const { nutrients } = nutrientsContext

  const getPercentage = (a?: number, b?: number) => {
    if (b === undefined || a === undefined || a === 0) return 0
    return Number(((a / b) * 100).toFixed(1))
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
          <NutritionIndex percentage={getPercentage(current?.macroNutrients.protein, nutrients?.macroNutrients.protein)} label="Protein" />
          <NutritionIndex percentage={getPercentage(current?.macroNutrients.carb, nutrients?.macroNutrients.carb)} label="Carbs" />
          <NutritionIndex percentage={getPercentage(current?.macroNutrients.fat, nutrients?.macroNutrients.fat)} label="Fat" />
        </div>
      </div>

      <div className="nutrition-list-container">
        <h3>Macronutrients:</h3>
        <ul className="nutrition-list">
          <li>Calories: {((nutrients?.macroNutrients.calories ?? 0) * multiplier).toFixed(0)} / {current?.macroNutrients.calories} kcal</li>
          <li>Protein: {((nutrients?.macroNutrients.protein ?? 0) * multiplier).toFixed(1)} / {current?.macroNutrients.protein} g</li>
          <li>Carb: {((nutrients?.macroNutrients.carb ?? 0) * multiplier).toFixed(1)} / {current?.macroNutrients.carb} g</li>
          <li>Fat: {((nutrients?.macroNutrients.fat ?? 0) * multiplier).toFixed(1)} / {current?.macroNutrients.fat} g</li>
        </ul>

        <h3>Micronutrients:</h3>
        <ul className="nutrition-list">
          <li>Fibre: {current?.microNutrients.fibre ?? 0}g ({getPercentage(current?.microNutrients.fibre ?? 0, (nutrients?.microNutrients.fibre ?? 0) * multiplier)}%)</li>
          <li>Magnesium: {current?.microNutrients.magnesium}mg ({getPercentage(current?.microNutrients.magnesium, nutrients?.microNutrients.magnesium ?? 0 * multiplier)}%)</li>
          <li>Natrium: {current?.microNutrients.natrium}mg ({getPercentage(current?.microNutrients.natrium, nutrients?.microNutrients.natrium ?? 0 * multiplier)}%)</li>
          <li>Calcium: {current?.microNutrients.calcium}mg ({getPercentage(current?.microNutrients.calcium, nutrients?.microNutrients.calcium ?? 0 * multiplier)}%)</li>
          <li>Potassium: {current?.microNutrients.potassium}mg ({getPercentage(current?.microNutrients.potassium, nutrients?.microNutrients.potassium ?? 0 * multiplier)}%)</li>
          <li>Iron: {current?.microNutrients.iron}mg ({getPercentage(current?.microNutrients.iron, nutrients?.microNutrients.iron ?? 0 * multiplier)}%)</li>
          <li>Zinc: {current?.microNutrients.zinc}mg ({getPercentage(current?.microNutrients.zinc, nutrients?.microNutrients.zinc ?? 0 * multiplier)}%)</li>
        </ul>
      </div>
    </div>
  )
}
export default Statistics