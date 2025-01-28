const Settings = () => {
    return (
        <div className="add-recipe-container">
            <form className="add-recipe-form">
                <h2>Personal Information</h2>

                <div className="form-group">
                    <label htmlFor="weight">Weight (kg):</label>
                    <select id="weight" name="weight">
                        {Array.from({ length: 80 }, (_, i) => (
                            <option key={i} value={40 + i}>
                                {40 + i} kg
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <select id="age" name="age">
                        {Array.from({ length: 120}, (_,i)=>(<option key={i} value={i}>{i}</option>))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="height">Height (cm):</label>
                    <select id="height" name="height">
                        {Array.from({ length: 80},(_,i)=>(<option key={i} value={140+i}>{140+i}</option>))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="activity-level">Activity Level:</label>
                    <select id="activity-level" name="activity-level">
                        <option value="1">Sedentary (little to no exercise)</option>
                        <option value="2">Lightly active (light exercise/sports 1-3 days a week)</option>
                        <option value="3">Moderately active (moderate exercise/sports 3-5 days a week)</option>
                        <option value="4">Very active (hard exercise/sports 6-7 days a week)</option>
                        <option value="5">Extra active (very hard exercise/physical job)</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn">Set base Information</button>
            </form>
        </div>
    )
}
export default Settings
