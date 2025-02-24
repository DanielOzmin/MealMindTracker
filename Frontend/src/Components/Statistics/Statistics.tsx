import NutritionIndex from './NutritionIndex';
import './Statistics.css'
import { Nutrients, NutrientsContext } from '../../Services/Nutrients';
import { useContext, useState, useEffect } from 'react';

type View = "Daily" | "Weekly" | "Monthly" | "AllTime" | "Settings" | "AddWorkout" | "RecipeNutrients" | "MealRecommendation"
type Prop = {
  view: View
  setNutrientDeficit: React.Dispatch<React.SetStateAction<number>>
}
const Statistics = ({ view, setNutrientDeficit }: Prop) => {
  const nutrientsContext = useContext(NutrientsContext)
  const [plusKcal, setPlusKcal] = useState<number>(0)
  const [current, setCurrent] = useState<Nutrients>({
    energy: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0, magnesium: 0, sodium: 0, calcium: 0, potassium: 0, iron: 0, zinc: 0
  })

  if (!nutrientsContext) {
    throw new Error("Some error with nutrients")
  }

  const { nutrients } = nutrientsContext
  const getDaysInMonth = () => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
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

  const getPercentage = (a?: number, b?: number) => {
    if (!b || b === 0) return 0
    return Number(((a ?? 0) / (b * multiplier) * 100).toFixed(1))
  }

  useEffect(() => {
    const fetchStatisticsData = async () => {
      try {
        const response = await fetch(`/api/RecipeConsumption/getByPeriod?view=${view}`)
        if (!response.ok) {
          throw new Error("failed to fecth data")
        }
        const data = await response.json()
        console.log(data)
        setCurrent(data)
      } catch (error) {
        console.error("error fetching data: ", error)
        setCurrent({
          energy: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0,
          magnesium: 0, sodium: 0, calcium: 0, potassium: 0, iron: 0, zinc: 0
        })
      }
    }
    const fetchCaloriesFromWorkout = async () => {
      try {
        const response = await fetch(`/api/Workout/getByPeriod?view=${view}`)
        if (!response.ok) {
          throw new Error("failed to fecth data")
        }
        const data = await response.json()
        setPlusKcal(data)
      } catch (error) {
        console.error(error)
      }

    }
    const calculateNutrientDeficit=()=>{
      const deficit: number = nutrients!.energy-current!.energy 
      setNutrientDeficit(deficit)
    }
    fetchStatisticsData()
    fetchCaloriesFromWorkout()
    calculateNutrientDeficit()
  }, [view])

  console.log(current)

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
          <li>Calories: {(((nutrients?.energy ?? 0) * multiplier) + plusKcal).toFixed(0)} / {(current?.energy ?? 0).toFixed(0)} kcal</li>
          <li>Protein: {((nutrients?.protein ?? 0) * multiplier).toFixed(1)} / {current?.protein.toFixed(1)} g</li>
          <li>Carb: {((nutrients?.carbohydrates ?? 0) * multiplier).toFixed(1)} / {current?.carbohydrates.toFixed(1)} g</li>
          <li>Fat: {((nutrients?.fat ?? 0) * multiplier).toFixed(1)} / {current?.fat.toFixed(1)} g</li>
        </ul>

        <h3>Micronutrients</h3>
        <ul className="nutrition-list">
          <li>Fibre: {current?.fiber.toFixed(1) ?? 0}g ({getPercentage(current?.fiber ?? 0, (nutrients?.fiber ?? 0) * multiplier)}%)</li>
          <li>Magnesium: {current?.magnesium.toFixed(1)}mg ({getPercentage(current?.magnesium, nutrients?.magnesium ?? 0 * multiplier)}%)</li>
          <li>Natrium: {current?.sodium.toFixed(1)}mg ({getPercentage(current?.sodium, nutrients?.sodium ?? 0 * multiplier)}%)</li>
          <li>Calcium: {current?.calcium.toFixed(1)}mg ({getPercentage(current?.calcium, nutrients?.calcium ?? 0 * multiplier)}%)</li>
          <li>Potassium: {current?.potassium.toFixed(1)}mg ({getPercentage(current?.potassium, nutrients?.potassium ?? 0 * multiplier)}%)</li>
          <li>Iron: {current?.iron.toFixed(1)}mg ({getPercentage(current?.iron, nutrients?.iron ?? 0 * multiplier)}%)</li>
          <li>Zinc: {current?.zinc.toFixed(1)}mg ({getPercentage(current?.zinc, nutrients?.zinc ?? 0 * multiplier)}%)</li>
        </ul>
      </div>
    </div>
  )
}
export default Statistics