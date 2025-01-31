export type PersonalData = {
    weight: number,
    age: number,
    gender: string,
    height: number,
    activityLevel: number
}

export type Recipe = {
    title: string,
    ingredients: string[]
}

export type Recipes = {
    recipes: Recipe[]
}

export type Workout = {
    calories: number,
    minute: number,
    workoutType: string,
    date: string
}

export type Workouts={
    workouts: Workout[]
}


