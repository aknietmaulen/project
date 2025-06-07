import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
// import "../../App.css"

export default function RampingCurve() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/overview/ramping")
        .then(res => setData(res.data))
    }, [])


  if (!data.length) return <p className="text-sm text-gray-500">Loading ramping curve...</p>

  const res = data.map(d => d.res_share)
  const ramping = data.map(d => d.thermal_ramping / 1e6) // Convert to MWh

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4">
      <h3 className="graph-card-title">Thermal Ramping</h3>
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
          height: 450,
          xaxis: { title: "RES Share" },
          yaxis: { title: "Thermal Generator Ramping (MWh)" },
          legend: { x: 0.5, xanchor: "center", y: -0.2, orientation: "h" },
          margin: { t: 40 }
        }}
        useResizeHandler={true}
        // style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
