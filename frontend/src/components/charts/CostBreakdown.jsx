import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
// import "../../App.css"

export default function CostBreakdown() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/overview/cost-breakdown")
      .then(res => setData(res.data))
  }, [])

  if (!data.length) return <p className="text-sm text-gray-500">Loading cost breakdown...</p>

  const res = data.map(d => d["RES Share (%)"])
  const total = data.map(d => d["Total Cost (M€)"])
  const capital = data.map(d => d["Capital Cost (M€)"])
  const marginal = data.map(d => d["Marginal Cost (M€)"])

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4">
      <h3>Total System Cost breakdown</h3>
      <Plot
        data={[
          {
            x: res,
            y: total,
            type: "bar",
            name: "Total Cost (M€)",
            marker: { color: "steelblue" }
          },
          {
            x: res,
            y: capital,
            type: "bar",
            name: "Capital Cost (M€)",
            marker: { color: "orange" }
          },
          {
            x: res,
            y: marginal,
            type: "bar",
            name: "Marginal Cost (M€)",
            marker: { color: "green" }
          }
        ]}
        layout={{
          barmode: "group",
          autosize: true,
          height: 400,
          width: 650,
          xaxis: { title: "RES Share (%)" },
          yaxis: { title: "Cost (M€)" },
          legend: { x: 0.5, xanchor: "center", y: -0.2, orientation: "h" },
          margin: { t: 40 }
        }}
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
