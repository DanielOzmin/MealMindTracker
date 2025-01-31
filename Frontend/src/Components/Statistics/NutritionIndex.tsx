import './NutritionIndex.css'

const NutritionIndex = ({ percentage, label }: { percentage: number; label: string }) => {
  const radius = 50
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className="circular-progress">
      <svg width="120" height="120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#e6e6e6"
          strokeWidth="10"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#007bff"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 0.5s ease",
          }}
        />
      </svg>
      <div className="circular-text">
        <strong>{percentage}%</strong>
        <span>{label}</span>
      </div>
    </div>
  )
}
export default NutritionIndex