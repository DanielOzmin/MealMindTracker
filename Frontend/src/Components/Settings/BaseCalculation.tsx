import './BaseCalculation.css'
import { useContext, useEffect } from 'react'
import { PersonalData } from '../../Services/User'
import { NutrientsContext } from '../../Services/Nutrients'


const BaseCalculation = ({ personalData }: { personalData: PersonalData }) => {
    const nutrientsContext = useContext(NutrientsContext)

    if (!nutrientsContext) {
        throw new Error("BaseCalculation must be used by nutriens context")
    }
    const { nutrients, setNutrients } = nutrientsContext

    const CalculateBMR = () => {
        let BMR = 0
        if (personalData.gender === "male") {
            BMR = 10 * personalData.weight + 6.25 * personalData.height - 5 * personalData.age + 5
        } else {
            BMR = 10 * personalData.weight + 6.25 * personalData.height - 5 * personalData.age - 161
        }
        return BMR
    }
    const CalculateBMRAndMakroNutrients = () => {
        const BMR = CalculateBMR()
        let calories = BMR

        switch (personalData.activityLevel) {
            case 1: calories *= 1.2; break
            case 2: calories *= 1.375; break
            case 3: calories *= 1.55; break
            case 4: calories *= 1.725; break
            case 5: calories *= 1.9; break
            case 6: calories *= 1; break
            default: break
        }

        let protein = ((calories * 0.2) / 4)
        let carbohydrates = (calories * 0.5) / 4
        let fat = (calories * 0.3) / 9


        return { calories, protein, carbohydrates, fat }
    }

    const CalculateMikroNutrients = () => {
        let fiber = 0
        let magnesium = 0
        let sodium = 0
        let calcium = 0
        let potassium = 0
        let iron = 0
        let zinc = 0
        if (personalData.gender === "male") {
                fiber = 35,
                magnesium = 420,
                sodium = 1600,
                calcium = 1150,
                potassium = 3400,
                iron = 8,
                zinc = 11
        } else {
                fiber = 25,
                magnesium = 310,
                sodium = 1500,
                calcium = 1000,
                potassium = 2600,
                iron = 18,
                zinc = 8
        }


        return { fiber, magnesium, sodium, calcium, potassium, iron, zinc }
    }

    useEffect(() => {
        const calculateNutrients = {
            calories: CalculateBMRAndMakroNutrients().calories,
            protein: CalculateBMRAndMakroNutrients().protein,
            carbohydrates: CalculateBMRAndMakroNutrients().carbohydrates,
            fat: CalculateBMRAndMakroNutrients().fat,
            fiber: CalculateMikroNutrients().fiber,
            magnesium: CalculateMikroNutrients().magnesium,
            sodium: CalculateMikroNutrients().sodium,
            calcium: CalculateMikroNutrients().calcium,
            potassium: CalculateMikroNutrients().potassium,
            iron: CalculateMikroNutrients().iron,
            zinc: CalculateMikroNutrients().zinc
        }
    
        setNutrients(calculateNutrients)

    }, [personalData, setNutrients])


return (
    <div className="base-calculation-container">
        <h2>Daily Intake</h2>
        <div className="nutrient-grid">
            <div className="nutrient-section">
                <h3>Macronutrients</h3>
                <div className="nutrient-values">
                    <p><span>Kcal:</span> {nutrients?.calories.toFixed(0)}</p>
                    <p><span>Protein:</span> {nutrients?.protein.toFixed(1)}g</p>
                    <p><span>Carb:</span> {nutrients?.carbohydrates.toFixed(1)}g</p>
                    <p><span>Fat:</span> {nutrients?.fat.toFixed(1)}g</p>
                </div>
            </div>
            <div className="nutrient-section">
                <h3>Micronutrients</h3>
                <div className="nutrient-values">
                    <p><span>Fibre:</span> {nutrients?.fiber}g</p>
                    <p><span>Magnesium:</span> {nutrients?.magnesium}mg</p>
                    <p><span>Natrium:</span> {nutrients?.sodium}mg</p>
                    <p><span>Calcium:</span> {nutrients?.calcium}mg</p>
                    <p><span>Potassium:</span> {nutrients?.potassium}mg</p>
                    <p><span>Iron:</span> {nutrients?.iron}mg</p>
                    <p><span>Zinc:</span> {nutrients?.zinc}mg</p>
                </div>
            </div>
        </div>
    </div>
)
}
export default BaseCalculation