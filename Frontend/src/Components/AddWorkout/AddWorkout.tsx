import { useState } from "react"
import './AddWorkout.css'

type Workout = {
    Calories: number,
    Minute: number,
    WorkoutType: string,
    Date: Date
}

const AddWorkout = () => {
    const [workout, setWorkout] = useState<Workout>({ Calories: 0, Minute: 0, WorkoutType: "", Date: new Date() })

    const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()

        try {
            const response = await fetch("/api/Workout/addWorkout",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(workout)
            })
            if(!response.ok){
                throw new Error(`Server error: ${response.status}`)
            }
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error("Failed to fetch")
            alert("failed to save workout")
        }
    }
    return (
        <div className="add-workout-container">
            <h2>Workout</h2>
            <form className="add-workout-form" onSubmit={handleSubmit}>
                <label>Calories:</label>
                <input type="number" onChange={(e) => setWorkout({ ...workout, Calories: Number(e.target.value) })} required/>
                <label>Time in minute:</label>
                <input type="number" onChange={(e) => setWorkout({ ...workout, Minute: Number(e.target.value) })} required/>
                <label>Workout type:</label>
                <input type="text" onChange={(e) => setWorkout({ ...workout, WorkoutType: String(e.target.value) })} placeholder="example: run" required/>
                <label>Workout Date:</label>
                <input 
                    type="date"
                    value={workout.Date.toISOString().split('T')[0]}
                    onChange={(e) => setWorkout({ ...workout, Date: new Date(e.target.value) })}
                    className="date-input"
                    required
                />
                <button>Add workout</button>
            </form>
        </div>
    )
}
export default AddWorkout