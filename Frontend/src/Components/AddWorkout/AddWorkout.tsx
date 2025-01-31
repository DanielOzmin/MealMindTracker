import { useState } from "react"
import './AddWorkout.css'

type Workout = {
    Calories: number,
    Minute: number,
    WorkoutType: string,
    Date: string
}

const AddWorkout = () => {
    const [workout, setWorkout] = useState<Workout>({ Calories: 0, Minute: 0, WorkoutType: "", Date: new Date().toISOString().slice(0, 10) })

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        console.log(workout)
    }
    return (
        <div className="add-workout-container">
            <h2>Workout</h2>
            <form className="add-workout-form" onSubmit={handleSubmit}>
                <label>Calories:</label>
                <input type="number" onChange={(e) => setWorkout({ ...workout, Calories: Number(e.target.value) })} />
                <label>Time in minute:</label>
                <input type="number" onChange={(e) => setWorkout({ ...workout, Minute: Number(e.target.value) })} />
                <label>Workout type:</label>
                <input type="text" onChange={(e) => setWorkout({ ...workout, WorkoutType: String(e.target.value) })} placeholder="example: run" />
                <label>Workout Date:</label>
                <input 
                    type="date"
                    value={workout.Date}
                    onChange={(e) => setWorkout({ ...workout, Date: e.target.value })}
                    className="date-input"
                />
                <button>Add workout</button>
            </form>
        </div>
    )
}
export default AddWorkout