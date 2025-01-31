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
        let carb = (calories * 0.5) / 4
        let fat = (calories * 0.3) / 9


        return { calories, protein, carb, fat }
    }

    const CalculateMikroNutrients = () =>{
        let fibre = 0
        let magnesium = 0
        let natrium = 0
        let calcium = 0
        let potassium =0
        let iron =0
        let zinc =0
        if(personalData.gender === "male"){
            fibre = 35, 
            magnesium = 420, 
            natrium = 1600, 
            calcium = 1150, 
            potassium = 3400, 
            iron = 8, 
            zinc = 11
        }else{
            fibre = 25, 
            magnesium = 310, 
            natrium = 1500, 
            calcium = 1000, 
            potassium = 2600, 
            iron = 18, 
            zinc = 8
        }


        return {fibre,magnesium,natrium,calcium,potassium,iron,zinc}
    }

    useEffect(()=>{
        const macroNutrients = CalculateBMRAndMakroNutrients()
        const microNutrients = CalculateMikroNutrients()
        setNutrients(prev => ({...prev, macroNutrients,microNutrients}))

    },[personalData,setNutrients])
    

    return (
        <div className="base-calculation-container">
            <h2>Daily Intake</h2>
            <div className="nutrient-grid">
                <div className="nutrient-section">
                    <h3>Macronutrients</h3>
                    <div className="nutrient-values">
                        <p><span>Kcal:</span> {nutrients?.macroNutrients.calories.toFixed(0)}</p>
                        <p><span>Protein:</span> {nutrients?.macroNutrients.protein.toFixed(1)}g</p>
                        <p><span>Carb:</span> {nutrients?.macroNutrients.carb.toFixed(1)}g</p>
                        <p><span>Fat:</span> {nutrients?.macroNutrients.fat.toFixed(1)}g</p>
                    </div>
                </div>
                <div className="nutrient-section">
                    <h3>Micronutrients</h3>
                    <div className="nutrient-values">
                        <p><span>Fibre:</span> {nutrients?.microNutrients.fibre}g</p>
                        <p><span>Magnesium:</span> {nutrients?.microNutrients.magnesium}mg</p>
                        <p><span>Natrium:</span> {nutrients?.microNutrients.natrium}mg</p>
                        <p><span>Calcium:</span> {nutrients?.microNutrients.calcium}mg</p>
                        <p><span>Potassium:</span> {nutrients?.microNutrients.potassium}mg</p>
                        <p><span>Iron:</span> {nutrients?.microNutrients.iron}mg</p>
                        <p><span>Zinc:</span> {nutrients?.microNutrients.zinc}mg</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BaseCalculation