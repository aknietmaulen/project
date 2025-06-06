import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function SystemCostChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/data/csv/cost_vs_tariff.csv")
      .then(res => setData(res.data))
  }, [])

  if (!data.length) return <p>Loading cost chart...</p>

  const res = data.map(d => d.res_share * 100)
  const cost = data.map(d => d.total_cost)
  const tariff = data.map(d => d.tariff)

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h3 className="text-lg font-bold mb-2">
        Total System Cost & Tariff vs RES Share
      </h3>
      <Plot
        data={[
          {
            x: res,
            y: cost,
            type: "scatter",
            mode: "lines+markers",
            name: "Total Cost (M€)",
            yaxis: "y1",
            line: {
              color: "blue",
              dash: "dot",
              width: 3
            },
            marker: { color: "blue", size: 6, symbol: "circle" }
          },
          {
            x: res,
            y: tariff,
            type: "scatter",
            mode: "lines+markers",
            name: "Tariff (€/MWh)",
            yaxis: "y2",
            line: {
              color: "orange",
              dash: "dot",
              width: 3
            },
            marker: { color: "orange", size: 6, symbol: "diamond" }
          }
        ]}
        layout={{
          width: 800,
          height: 450,
          margin: { t: 40 },
          xaxis: { title: "RES Share (%)" },
          yaxis: {
            title: "Total Cost (M€)",
            titlefont: { color: "blue" },
            tickfont: { color: "blue" }
          },
          yaxis2: {
            title: "Tariff (€/MWh)",
            overlaying: "y",
            side: "right",
            titlefont: { color: "orange" },
            tickfont: { color: "orange" }
          },
          legend: { x: 0.5, xanchor: "center", y: -0.2, orientation: "h" },
          hovermode: "x unified"
        }}
      />
    </div>
  )
}
