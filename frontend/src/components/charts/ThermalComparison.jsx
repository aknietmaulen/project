import React, { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function ThermalComparisonChart() {
  const [rampingData, setRampingData] = useState([])
  const [genData, setGenData] = useState([])

  useEffect(() => {
    axios.get("/overview/ramping")
      .then(res => setRampingData(res.data))
      .catch(err => console.error("Failed to fetch ramping data:", err))

    axios.get("/overview/generation-mix")
      .then(res => setGenData(res.data))
      .catch(err => console.error("Failed to fetch generation mix:", err))
  }, [])

  if (!rampingData.length || !genData.length)
    return <p className="text-sm text-gray-500">Loading thermal comparison chart...</p>

  const thermalPercentages = []
  const rampingPercentages = []
  const resShare = []

  for (let i = 0; i < genData.length; i++) {
    const gen = genData[i]
    const ramp = rampingData[i]

    const totalGen =
      gen["coal [GWh]"] +
      gen["CCGT [GWh]"] +
      gen["OCGT [GWh]"] +
      gen["onwind [GWh]"] +
      gen["solar [GWh]"] +
      gen["ror [GWh]"] +
      gen["hydro [GWh]"]

    const thermalGen =
      gen["coal [GWh]"] + gen["CCGT [GWh]"] + gen["OCGT [GWh]"]

    const thermalGenPct = (thermalGen / totalGen) * 100
    const rampingPct = (ramp.thermal_ramping / 1e3 / totalGen) * 100 // MWh to GWh, then percent

    resShare.push(ramp.res_share * 100)
    thermalPercentages.push(thermalGenPct)
    rampingPercentages.push(rampingPct)
  }

  return (
    <div className="bg-white shadow rounded-xl p-4 mt-4">
      <h3 className="text-lg font-bold mb-2">
        Thermal Generation vs. Ramping (% of Total Generation)
      </h3>
      <Plot
        data={[
          {
            x: resShare,
            y: thermalPercentages,
            type: "scatter",
            mode: "lines+markers",
            name: "Thermal Generation %",
            line: { color: "#ff7f0e", width: 3 },
            marker: { color: "#ff7f0e" },
          },
          {
            x: resShare,
            y: rampingPercentages,
            type: "scatter",
            mode: "lines+markers",
            name: "Thermal Ramping %",
            line: { color: "#1f77b4", width: 3 },
            marker: { color: "#1f77b4" },
          },
        ]}
        layout={{
          xaxis: { title: "RES Share (%)", ticksuffix: "%" },
          yaxis: {
            title: "Percentage of Total Generation (%)",
            ticksuffix: "%",
            range: [0, 100],
          },
          legend: { x: 0.5, xanchor: "center", y: -0.2, orientation: "h" },
          margin: { t: 30 },
        }}
        useResizeHandler
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  )
}
