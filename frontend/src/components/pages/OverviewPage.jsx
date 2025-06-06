import { useEffect, useState } from 'react'
import GenerationMixChart from '../charts/GenerationMixChart'
import KazakhstanMap from '../maps/KazakhstanMap'
import SystemCostChart from "../charts/SystemCostChart"
import CarrierCostTable from '../tables/CarrierCostTable'
import CostBreakdown from "../charts/CostBreakdown"
import RampingCurve from "../charts/RampingCurve"

import axios from 'axios'
import "../../App.css"

axios.defaults.baseURL = 'http://localhost:8000'

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-[#e6f4f1] p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Overview Dashboard</h2>

      <div className="grid grid-cols-2 gap-6">
        {/* LEFT column: chart + table in one card */}
        <div className="card flex flex-col">
          <h3 className="text-xl font-bold mb-4 text-center">Total System Cost for 2030</h3>
          <SystemCostChart />
          <CarrierCostTable />
        </div>

        {/* RIGHT column: two stacked cards */}
        <div className="flex flex-col gap-6">
          <div className="card">
            <CostBreakdown />
          </div>
          <div className="card">
            <RampingCurve />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <GenerationMixChart />
        <KazakhstanMap />
      </div>
    </div>
  )
}
