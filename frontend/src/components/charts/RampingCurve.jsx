import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function RampingCurve() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/overview/ramping")
      .then(res => setData(res.data))
      .catch(err => console.error("Failed to fetch ramping data:", err))
  }, [])

  if (!data.length) return <p className="text-sm text-gray-500">Loading ramping curve...</p>

  const res = data.map(d => d.res_share * 100) // Convert to percent
  const ramping = data.map(d => d.thermal_ramping / 1e6) // Convert to MWh

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4">
      <h3 className="text-lg font-bold mb-2">Thermal Generator Ramping</h3>
      <Plot
        data={[
          {
            x: res,
            y: ramping,
            type: "scatter",
            mode: "lines+markers",
            name: "Smoothed Thermal Ramping",
            line: { color: "steelblue", width: 3 },
            marker: { color: "steelblue", size: 5 }
          },
          {
            x: res,
            y: ramping,
            mode: "markers",
            name: "Original Points",
            marker: { color: "red", size: 7, symbol: "circle" }
          }
        ]}
        layout={{
          autosize: true,
          xaxis: {
            title: "RES Share (%)",
            ticksuffix: "%",
            showgrid: true
          },
          yaxis: {
            title: "Thermal Ramping (MWh)",
            tickformat: ",.0f", // thousands separator
            ticksuffix: " MWh",
            showgrid: true
          },
          legend: {
            x: 0.5,
            xanchor: "center",
            y: -0.2,
            orientation: "h"
          },
          margin: { t: 40 }
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
