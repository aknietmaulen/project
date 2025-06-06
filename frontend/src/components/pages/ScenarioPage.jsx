import { useState } from "react"

const RES_LEVELS = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]

export default function ScenarioPage() {
  const [selectedRes, setSelectedRes] = useState(0.3)

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Scenario Analysis: {Math.round(selectedRes * 100)}%</h2>

      <select
        className="p-2 border rounded mb-6"
        value={selectedRes}
        onChange={(e) => setSelectedRes(parseFloat(e.target.value))}
      >
        {RES_LEVELS.map((level) => (
          <option key={level} value={level}>
            {Math.round(level * 100)}% RES
          </option>
        ))}
      </select>

      <div className="text-gray-500 italic">
        Data and visuals for this scenario will appear here soon.
      </div>
    </div>
  )
}
