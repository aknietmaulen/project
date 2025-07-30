import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function SystemCostChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/overview/cost-tariff")
      .then(res => setData(res.data))
  }, [])

  if (!data.length)
    return <p className="text-sm text-gray-500">Loading cost chart...</p>

  const res = data.map(d => d.res_share * 100) // Convert to percentage
  const cost = data.map(d => d.total_cost)
  const tariff = data.map(d => d.tariff)

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4 small-plot-container">
      <h3 className="text-lg font-bold mb-2">System Cost and Tariff</h3>
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
          autosize: true,
          margin: { t: 30, l: 60, r: 60, b: 50 },
          xaxis: {
            title: "RES Share (%)",
            ticksuffix: "%",
            showgrid: true
          },
          yaxis: {
            title: "Total System Cost (M€)",
            titlefont: { color: "blue" },
            tickfont: { color: "blue" },
            ticksuffix: " M€",
            showgrid: true
          },
          yaxis2: {
            title: "Tariff (€/MWh)",
            overlaying: "y",
            side: "right",
            titlefont: { color: "orange" },
            tickfont: { color: "orange" },
            ticksuffix: " €/MWh",
            showgrid: false
          },
          legend: {
            x: 0.5,
            xanchor: "center",
            y: -0.25,
            orientation: "h"
          },
          hovermode: "x unified"
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
