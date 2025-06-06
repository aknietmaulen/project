import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function RampingCurve() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/data/csv/ramping_curve.csv").then(res => setData(res.data))
  }, [])

  if (!data.length) return <p>Loading curve...</p>

  const x = data.map(d => d.res_share)
  const y = data.map(d => d.thermal_ramping)

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h3 className="text-lg font-bold mb-2">Thermal Ramping vs RES Share</h3>
      <Plot
        data={[{
          type: 'scatter',
          mode: 'lines+markers',
          x, y,
          line: { shape: 'spline' },
        }]}
        layout={{
          width: 700,
          height: 400,
          xaxis: { title: "RES Share" },
          yaxis: { title: "Ramping (MWh)" },
          margin: { t: 40 }
        }}
      />
    </div>
  )
}
