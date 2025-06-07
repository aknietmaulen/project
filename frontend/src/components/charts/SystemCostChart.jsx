import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
// import "../../App.css"

export default function SystemCostChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/overview/cost-tariff")
      .then(res => setData(res.data))
  }, [])

  if (!data.length) return <p className="text-sm text-gray-500">Loading cost chart...</p>

  const res = data.map(d => d.res_share * 100)
  const cost = data.map(d => d.total_cost)
  const tariff = data.map(d => d.tariff)

  return (
      <div className="bg-white shadow rounded-xl p-4 mt-4 small-plot-container">
        <h3>Total System Cost (M€)</h3>
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
          height: 400,
          width: 600,
          margin: { t: 10 },
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
        useResizeHandler={true}
        style={{ width: "100%", height: "100%" }}

      />
    </div>
  )
}
