import { useEffect, useState } from "react"
import axios from "axios"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function GenerationPieChart({ resShare }) {
  const [genData, setGenData] = useState(null)

  const colorMap = {
    coal: "#707070",
    CCGT: "#592693",
    OCGT: "#FF0000",
    onwind: "#2ca02c",
    solar: "#ffff00",
    ror: "#1f77b4",
    hydro: "#76b5c5"
  }

  useEffect(() => {
    axios
      .get(`/scenario/generation-mix?res=${resShare}`)
      .then((res) => setGenData(res.data))
      .catch((err) => console.error("Failed to load generation mix", err))
  }, [resShare])

  if (!genData) return <p className="loading-text">Loading chart...</p>

  const data = {
    labels: ["Coal", "CCGT", "OCGT", "Onwind", "Solar", "ROR", "Hydro"],
    datasets: [
      {
        data: [
          genData.coal,
          genData.CCGT,
          genData.OCGT,
          genData.onwind,
          genData.solar,
          genData.ror,
          genData.hydro
        ],
        backgroundColor: [
          colorMap.coal,
          colorMap.CCGT,
          colorMap.OCGT,
          colorMap.onwind,
          colorMap.solar,
          colorMap.ror,
          colorMap.hydro
        ],
        borderWidth: 1
      }
    ]
  }

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || ""
            const value = context.parsed || 0
            return `${label}: ${value.toFixed(1)} GWh`
          }
        }
      },
      legend: {
        position: "right",
        labels: {
          boxWidth: 14,
          font: { size: 12 }
        }
      }
    }
  }

  return (
    <div className="chart-card">
      <h3 className="chart-title">
        Generation Mix for 2030<br />RES {Math.round(resShare * 100)}% (GWh)
      </h3>
      <Pie data={data} options={options} />
    </div>
  )
}
