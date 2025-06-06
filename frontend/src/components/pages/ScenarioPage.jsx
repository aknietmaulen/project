import { useState } from "react"
import MetricCard from "../metrics/MetricCard"
import "./ScenarioPage.css"
import GenerationPieChart from "../charts/GenerationPieChart"
import SystemCostTable from "../tables/SystemCostTable"
import DailyProfiles from "../charts/DailyProfiles"



const RES_LEVELS = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]

export default function ScenarioPage() {
  const [selectedRes, setSelectedRes] = useState(0.3)

  const handleSlider = (e) => {
    const value = Number(e.target.value)
    setSelectedRes(RES_LEVELS[value])
  }

  return (
    <div className="page-wrapper">
      <h2 className="page-title">
        Scenario Analysis — {Math.round(selectedRes * 100)}% RES
      </h2>

      <div className="res-slider">
        <label className="res-label">RES share</label>

        <input
          type="range"
          min="0"
          max={RES_LEVELS.length - 1}
          step="1"
          value={RES_LEVELS.indexOf(selectedRes)}
          onChange={handleSlider}
          className="slider"
        />

        <div className="slider-labels">
          {RES_LEVELS.map((level, index) => (
            <span key={index} className="slider-step">
              {Math.round(level * 100)}%
            </span>
          ))}
        </div>
      </div>

      <MetricCard resShare={selectedRes} />
      <div className="chart-section">
        <GenerationPieChart resShare={selectedRes} />
        <SystemCostTable resShare={selectedRes} />
      </div>
      <DailyProfiles resShare={selectedRes} />
    </div>
  )
}
