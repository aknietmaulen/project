import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
import "../../App.css"

export default function EmissionsChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/overview/emissions")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch emissions:", err))
  }, [])

  if (!data.length) return <p className="text-sm text-gray-500">Loading CO₂ emissions...</p>

  const x = data.map(row => row["RES Share"] * 100) // Convert to percent

  const traces = [
    {
      x,
      y: data.map(row => row.coal),
      name: "Coal",
      type: "bar",
      marker: { color: "#707070" },
    },
    {
      x,
      y: data.map(row => row.CCGT),
      name: "CCGT",
      type: "bar",
      marker: { color: "#1F77B3" },
    },
    {
      x,
      y: data.map(row => row.OCGT),
      name: "OCGT",
      type: "bar",
      marker: { color: "#ADC6E8" },
    },
  ]

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4">
      <h3 className="text-lg font-bold mb-2">CO₂ Emissions by Carrier (Mt CO₂)</h3>
      <Plot
        data={traces}
        layout={{
          barmode: "stack",
          xaxis: {
            title: "RES Share (%)",
            ticksuffix: "%",
          },
          yaxis: {
            title: "Total Emissions (Mt CO₂)",
            tickformat: ",.2f",
          },
          legend: { orientation: "h" },
          margin: { t: 30 },
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
