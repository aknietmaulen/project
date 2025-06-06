import { useEffect, useState } from 'react'
import MetricCard from '../metrics/MetricCard'
import GenerationMixChart from '../charts/GenerationMixChart'
import KazakhstanMap from '../maps/KazakhstanMap'
import SystemCostChart from "../charts/SystemCostChart"
import CarrierCostTable from '../tables/CarrierCostTable'


import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

export default function OverviewPage() {
  const [metrics, setMetrics] = useState([])

  useEffect(() => {
    axios.get('/overview/metrics')
        .then(res => {
        setMetrics(res.data)
        })
        .catch(err => {
        console.error("Failed to load metrics:", err)
        })
    }, [])


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Overview Dashboard</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((m, idx) => (
          <MetricCard key={idx} res={m.res} co2={m.co2_mt} cost={m.cost} />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
            <SystemCostChart />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
            <CarrierCostTable />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-center mb-2">Generation Mix</h3>
            <GenerationMixChart data={metrics} />
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-lg">
            <h3 className="text-lg font-bold text-center mb-2">Kazakhstan Energy Map</h3>
            <KazakhstanMap />
        </div>
        </div>

    </div>
  )
}
