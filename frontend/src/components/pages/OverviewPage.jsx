import { useEffect, useState } from 'react'
import GenerationMixChart from '../charts/GenerationMixChart'
import KazakhstanMap from '../maps/SolarMapInteractive'
import SystemCostChart from "../charts/SystemCostChart"
import CarrierCostTable from '../tables/CarrierCostTable'
import CostBreakdown from "../charts/CostBreakdown"
import RampingCurve from "../charts/RampingCurve"
import EmissionsChart from '../charts/EmissionsChart'

import axios from 'axios'
import "../../App.css"

axios.defaults.baseURL = 'http://localhost:8000'

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#e6f4f1] p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Overview Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="card min-w-0 h-full">
            <SystemCostChart />
        </div>

        {/* Card 2 */}
        <div className="card min-w-0 h-full">
            <CostBreakdown />
        </div>

        {/* Card 3 */}
        <div className="card min-w-0 h-full">
            <CarrierCostTable />
        </div>

        {/* Card 4 */}
        <div className="card min-w-0 h-full">
            <RampingCurve />
        </div>

        {/* Card 4 */}
        <div className="card min-w-0 h-full">
            <GenerationMixChart />
        </div>

        <div className="card min-w-0 h-full">
            <EmissionsChart />
        </div>

        <div className="card min-w-0 h-full">
            <KazakhstanMap />
        </div>
    </div>

      <div className="mt-10">
        <KazakhstanMap />
      </div>
    </div>
  )
}
