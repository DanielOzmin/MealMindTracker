import { createContext } from "react"

export type Nutrients ={
    energy: number,
    protein: number,
    carbohydrates: number,
    fat: number,
    fiber: number,
    magnesium: number,
    sodium: number,
    calcium: number,
    potassium: number,
    iron: number,
    zinc: number
} | null

export type NutrientsContextType={
    nutrients: Nutrients,
    setNutrients: React.Dispatch<React.SetStateAction<Nutrients>>
}

export const NutrientsContext = createContext<NutrientsContextType | null>(null)