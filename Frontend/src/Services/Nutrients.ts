import { createContext } from "react"

export type MacroNutrients = {
    calories: number,
    protein: number,
    carb: number,
    fat: number
}

export type MicroNutrients = {
    fibre: number,
    magnesium: number,
    natrium: number,
    calcium: number,
    potassium: number,
    iron: number,
    zinc: number
}

export type Nutrients = {
    macroNutrients: MacroNutrients,
    microNutrients: MicroNutrients
} | null

export type NutrientsContextType={
    nutrients: Nutrients,
    setNutrients: React.Dispatch<React.SetStateAction<Nutrients>>
}

export const NutrientsContext = createContext<NutrientsContextType | null>(null)