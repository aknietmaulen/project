import React, { useEffect, useState } from "react"
import axios from "axios"
import "./MetricCard.css" // Import regular CSS

export default function MetricCard({ resShare }) {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    axios
      .get(`/scenario/metrics?res=${resShare}`)
      .then((res) => setMetrics(res.data))
      .catch((err) => console.error("Failed to load metrics", err))
  }, [resShare])

  if (!metrics) return <p className="loading-text">Loading metrics...</p>

  const cards = [
    {
      label: "Total System Cost",
      value: `${Math.round(metrics.total_cost)} M€`,
    },
    {
      label: "Tariff",
      value: `${metrics.tariff.toFixed(1)} €/MWh`,
    },
    {
      label: "Thermal Ramping",
      value: `${(metrics.thermal_ramping / 1e6).toFixed(1)} MWh`,
    },
    {
      label: "CO₂ Emissions",
      value: `${(metrics.emissions?.CCGT + metrics.emissions?.OCGT + metrics.emissions?.coal).toFixed(1)} Mt`,
    },
  ]

  return (
    <div className="card-grid">
      {cards.map((card, idx) => (
        <div key={idx} className="metric-card">
          <div className="metric-label">{card.label}</div>
          <div className="metric-value">{card.value}</div>
        </div>
      ))}
    </div>
  )
}
