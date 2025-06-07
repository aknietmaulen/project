import { useEffect, useState } from "react"
import axios from "axios"
import Plot from "react-plotly.js"

export default function DailyProfiles({ resShare }) {
  const [winterData, setWinterData] = useState([])
  const [summerData, setSummerData] = useState([])

  const colorMap = {
    coal: "#707070",
    CCGT: "#592693",
    OCGT: "#FF0000",
    onwind: "#2ca02c",
    solar: "#ffff00",
    ror: "#1f77b4",
    battery: "#c2c2f0",
    hydro: "#76b5c5",
    Load: "black"
  }

  useEffect(() => {
    axios.get(`/scenario/daily-profiles?res=${resShare}`)
      .then(res => {
        const { winter, summer } = res.data

        const transform = (profile) => {
          const stack = profile.datasets.filter(d => d.label !== "Load")
          const load = profile.datasets.find(d => d.label === "Load")

          const traces = stack.map(d => ({
            x: profile.labels,
            y: d.data,
            name: d.label,
            type: "scatter",
            mode: "none",
            stackgroup: "one",
            fill: "tonexty",
            fillcolor: colorMap[d.label] || "rgba(200,200,200,0.5)",
            line: { width: 0 },
            hoverinfo: "x+y+name"
          }))

          if (load) {
            traces.push({
              x: profile.labels,
              y: load.data,
              name: "Load",
              type: "scatter",
              mode: "lines",
              line: {
                color: colorMap["Load"],
                dash: "dash",
                width: 3
              },
              fill: "none",
              hoverinfo: "x+y+name"
            })
          }

          return traces
        }

        setWinterData(transform(winter))
        setSummerData(transform(summer))
      })
      .catch(err => {
        console.error("Failed to load daily profiles", err)
      })
  }, [resShare])

  const resPercent = Math.round(resShare * 100)

  const layoutBase = (title) => ({
    title: { text: title, font: { size: 16 } },
    margin: { t: 40, r: 20, l: 50, b: 40 },
    xaxis: {
      title: "Time (hour)",
      tickmode: "array",
      tickvals: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "00:00"],
      tickfont: { size: 11 }
    },
    yaxis: {
      title: "Generation (GW)",
      tickformat: "~g",
      tickfont: { size: 12 }
    },
    font: { family: "Arial", size: 13, color: "#333" },
    legend: {
      orientation: "v",
      x: 1.02,
      y: 0.5,
      xanchor: "left",
      font: { size: 11 }
    },
    plot_bgcolor: "white",
    paper_bgcolor: "white",
    annotations: [
      {
        x: 1,
        y: 1,
        xref: "paper",
        yref: "paper",
        text: `${resPercent}% RES Scenario`,
        showarrow: false,
        font: { size: 10 },
        align: "right",
        xanchor: "right",
        yanchor: "top",
        bgcolor: "white",
        opacity: 0.9
      }
    ]
  })

  return (
    <div className="daily-profiles-wrapper">
      <div className="profile-card">
        <h4 className="profile-title">Daily Generation Profiles (Winter & Summer)</h4>
  
        <div className="plots-inline">
          <Plot
            data={winterData}
            layout={layoutBase("Winter Day Supply (Jan 15)")}
            style={{ width: "400px", height: "420px" }}
            config={{ displayModeBar: false }}
          />
  
          <Plot
            data={summerData}
            layout={layoutBase("Summer Day Supply (Jul 15)")}
            style={{ width: "400px", height: "420px" }}
            config={{ displayModeBar: false }}
          />
        </div>
      </div>
    </div>
  )
  
}
