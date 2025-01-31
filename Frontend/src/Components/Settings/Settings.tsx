import { useState } from 'react'
import './Settings.css'
import BaseCalculation from './BaseCalculation'
import { PersonalData } from '../../Services/User'



const Settings = () => {
    const [isAlreadySet, setIsAlreadySet] = useState<boolean>(false)
    const [personalData, setPersonalData] = useState<PersonalData>({
        weight: 70,
        age: 25,
        gender: "male",
        height: 175,
        activityLevel: 1
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPersonalData({
            ...personalData,
            [e.target.name]: e.target.value === "male" || e.target.value === "female"
                ? e.target.value
                : Number(e.target.value) 
        })
    }
    
    const handleSubmit=(e:React.FormEvent<HTMLElement>)=>{
        e.preventDefault()
        setIsAlreadySet(true)
    }

    return (
        <div className="settings-container">
            {isAlreadySet?<BaseCalculation personalData={personalData} />:
            <form className="settings-form" onSubmit={handleSubmit}>
                <h2>Personal Information</h2>

                <div className="form-group">
                    <label htmlFor="weight">Weight (kg):</label>
                    <select id="weight" name="weight" value={personalData.weight} onChange={handleChange}>
                        {Array.from({ length: 80 }, (_, i) => (
                            <option key={i} value={40 + i}>{40 + i} kg</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <select id="age" name="age" value={personalData.age} onChange={handleChange}>
                        {Array.from({ length: 120 }, (_, i) => (
                            <option key={i} value={i}>{i}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={personalData.gender} onChange={handleChange}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="height">Height (cm):</label>
                    <select id="height" name="height" value={personalData.height} onChange={handleChange}>
                        {Array.from({ length: 80 }, (_, i) => (
                            <option key={i} value={140 + i}>{140 + i}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="activity-level">Activity Level:</label>
                    <select id="activity-level" name="activityLevel" value={personalData.activityLevel} onChange={handleChange}>
                        <option value="1">Sedentary (little to no exercise)</option>
                        <option value="2">Lightly active (light exercise/sports 1-3 days a week)</option>
                        <option value="3">Moderately active (moderate exercise/sports 3-5 days a week)</option>
                        <option value="4">Very active (hard exercise/sports 6-7 days a week)</option>
                        <option value="5">Extra active (very hard exercise/physical job)</option>
                        <option value="6">Don't give activity (Add manually in the app)</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">Set base information</button>
            </form>}
        </div>
    )
}
export default Settings
