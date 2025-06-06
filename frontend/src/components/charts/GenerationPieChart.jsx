import { useEffect, useState } from "react"
import axios from "axios"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function GenerationPieChart({ resShare }) {
  const [genData, setGenData] = useState(null)

  useEffect(() => {
    axios
      .get(`/scenario/generation-mix?res=${resShare}`)
      .then((res) => setGenData(res.data))
      .catch((err) => console.error("Failed to load generation mix", err))
  }, [resShare])

  if (!genData) return <p className="loading-text">Loading chart...</p>

  const data = {
    labels: ["Coal", "CCGT", "OCGT", "Onwind", "Solar", "ROR"],
    datasets: [
      {
        data: [
          genData.coal,
          genData.CCGT,
          genData.OCGT,
          genData.onwind,
          genData.solar,
          genData.ror,
        ],
        backgroundColor: [
          "#9ca3af", "#60a5fa", "#fbbf24", "#34d399", "#f87171", "#a78bfa",
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="chart-card">
      <h3 className="chart-title">Generation Mix for 2030 (RES {Math.round(resShare * 100)}%)</h3>
      <Pie data={data} />
    </div>
  )
}
