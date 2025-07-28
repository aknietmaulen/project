import { useEffect, useState } from 'react'
import GenerationMixChart from '../charts/GenerationMixChart'
import KazakhstanMap from '../maps/SolarMapInteractive'
import SystemCostChart from "../charts/SystemCostChart"
import CarrierCostTable from '../tables/CarrierCostTable'
import CostBreakdown from "../charts/CostBreakdown"
import RampingCurve from "../charts/RampingCurve"
import EmissionsChart from '../charts/EmissionsChart'
import SolarMapHighQuality from '../maps/SolarMapInteractive'
import WindMapHighQuality from '../maps/WindMapInteractive'
import RenewableMapHighQuality from '../maps/Renewable'
import ProjectInfo from '../info/ProjectInfo'
import "./OverviewPage.css"
import axios from 'axios'
// import "../../App.css"

axios.defaults.baseURL = process.env.REACT_APP_API_URL;


export default function OverviewPage() {
  return (
    <div className="overview-container">
      <h2 className="overview-title">About Our Project</h2>
      <ProjectInfo />

      <h2 className="overview-title">Overview Dashboard</h2>

      <div className="cards-grid">
        <ProjectInfo />
        <div className="card"><SystemCostChart /></div>
        <div className="card"><CostBreakdown /></div>
        <div className="card"><CarrierCostTable /></div>
        <div className="card"><RampingCurve /></div>
        <div className="card"><GenerationMixChart /></div>
        <div className="card"><EmissionsChart /></div>
      </div>

      <div className="mt-10 map-container">
        <RenewableMapHighQuality />
      </div>

    </div>
  );
}
