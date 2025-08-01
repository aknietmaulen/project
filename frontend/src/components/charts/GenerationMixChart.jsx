import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function GenerationMixChart() {
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get("/overview/generation-mix")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch generation mix:", err))
  }, [])

  if (!data.length) return <p className="text-sm text-gray-500">Loading generation mix chart...</p>

  const carriers = [
    { key: "coal", label: "coal", color: "#707070" },
    { key: "CCGT", label: "CCGT", color: "#1F77B3" },
    { key: "OCGT", label: "OCGT", color: "#ADC6E8" },
    { key: "onwind", label: "Onwind", color: "#2B9F2C" },
    { key: "solar", label: "Solar", color: "#FDFE02" },
    { key: "ror", label: "RoR", color: "#AED8E6" },
    { key: "hydro", label: "hydro", color: "#76b5c5" },
  ]

  const resShare = data.map((row) => row["res_share"])


   const traces = carriers.map((carrier, i) => ({
    x: resShare,
    y: data.map((row) => row[`${carrier.key} [GWh]`]),
    type: "scatter",
    mode: "lines",
    name: carrier.label,
    stackgroup: "one",
    fill: "tonexty",
    line: { width: 1, color: carrier.color },
    fillcolor: carrier.color,
  }))

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4">
      <h3 className="text-lg font-bold mb-2">Generation Mix by RES Share (GWh)</h3>
      <Plot
        data={traces}
        layout={{
          barmode: "group",
          autosize: true,
          xaxis: {
            title: "RES Share (%)",
            tickformat: ",.0f",
            ticksuffix: "%"
          },
          yaxis: {
            title: "Cost",
            ticksuffix: " M€",
            tickfont: { color: "black" },
            titlefont: { color: "black" }
          },
          legend: { x: 0.5, xanchor: "center", y: -0.2, orientation: "h" },
          margin: { t: 40 }
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )

}