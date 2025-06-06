import { useEffect, useState } from "react"
import axios from "axios"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Custom plugin for RES % label in top-right
const customTextPlugin = (resPercent) => ({
  id: "scenarioLabel",
  afterDraw: (chart) => {
    const { ctx } = chart
    ctx.save()
    ctx.font = "10px sans-serif"
    ctx.fillStyle = "black"
    ctx.textAlign = "right"
    ctx.fillText(
      `${resPercent}% RES Scenario`,
      chart.chartArea.right - 5,
      chart.chartArea.top + 10
    )
    ctx.restore()
  }
})

export default function DailyProfiles({ resShare }) {
  const [data, setData] = useState({ winter: null, summer: null })

  useEffect(() => {
    axios.get(`/scenario/daily-profiles?res=${resShare}`)
      .then(res => setData(res.data))
      .catch(err => console.error("Failed to load daily profiles", err))
  }, [resShare])

  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false
    },
    stacked: true,
    plugins: {
      legend: { position: "right" },
      scenarioLabel: {}
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (hour)"
        },
        ticks: {
          maxTicksLimit: 8,
          callback: function (value, index, ticks) {
            return index % 3 === 0 ? this.getLabelForValue(value) : ''
          }
        }
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Generation (GW)"
        }
      }
    }
  }

  if (!data.winter || !data.summer) {
    return <p style={{ textAlign: "center" }}>Loading profiles...</p>
  }

  const resPercent = Math.round(resShare * 100)

  return (
    <div className="daily-profiles-grid">
      <div className="profile-card">
        <h4 className="profile-title">Winter Day Supply (Jan 15)</h4>
        <Line data={data.winter} options={options} plugins={[customTextPlugin(resPercent)]} />
      </div>
      <div className="profile-card">
        <h4 className="profile-title">Summer Day Supply (Jul 15)</h4>
        <Line data={data.summer} options={options} plugins={[customTextPlugin(resPercent)]} />
      </div>
    </div>
  )
}
