import { useState, useEffect } from "react"
import axios from "axios"
import MetricCard from "../metrics/MetricCard"
import GenerationMixChart from "../charts/GenerationMixChart"
import KazakhstanMap from '..//maps/KazakhstanMap'

const RES_LEVELS = [0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6]

export default function ScenarioPage() {
  const [selectedRes, setSelectedRes] = useState(0.3)
  const [data, setData] = useState(null)

  useEffect(() => {
    axios.get(`/scenario/details?res=${selectedRes}`).then(res => {
      setData(res.data)
    })
  }, [selectedRes])
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

      {data && !data.error && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <MetricCard res={data.res} co2={data.co2_mt} cost={data.total_cost} />
            <div className="bg-white p-4 shadow rounded-xl">
              <p>Tariff: {data.tariff.toFixed(4)} $/kWh</p>
              <p>Ramping: {data.ramping.toFixed(2)} MW change/hr</p>
            </div>
          </div>

          <GenerationMixChart data={data.generation_mix} />
          <KazakhstanMap />
        </>
      )}
    </div>
  )
}
