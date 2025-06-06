// import { useEffect, useState } from "react"
// import Plot from "react-plotly.js"
// import axios from "axios"

// export default function KazakhstanMap() {
//   const [mapData, setMapData] = useState(null)

//   useEffect(() => {
//     axios.get("/scenario/map_data").then(res => setMapData(res.data))
//   }, [])

//   if (!mapData) return <p>Loading maps...</p>

//   const layout = {
//     title: "Kazakhstan Renewable Potential and Grid",
//     geo: {
//       scope: "asia",
//       projection: { type: "mercator" },
//       center: { lon: 66.9, lat: 48.0 },
//       resolution: 50,
//       fitbounds: "locations",
//       showland: true,
//       landcolor: "#EDEDED",
//       countrycolor: "#ccc"
//     },
//     margin: { t: 40, b: 0 }
//   }
//   const layers = [
//     {
//       type: "scattergeo",
//       mode: "markers",
//       name: "Thermal Plants",
//       lat: mapData.thermal.features.map(f => f.geometry.coordinates[1]),
//       lon: mapData.thermal.features.map(f => f.geometry.coordinates[0]),
//       marker: { size: 8, color: "brown" },
//       text: mapData.thermal.features.map(f => f.properties.name)
//     },
//     {
//       type: "scattergeo",
//       mode: "lines",
//       name: "Grid Lines",
//       lat: mapData.grid.features.flatMap(f => f.geometry.coordinates.map(c => c[1]).concat([null])),
//       lon: mapData.grid.features.flatMap(f => f.geometry.coordinates.map(c => c[0]).concat([null])),
//       line: { width: 2, color: "blue" }
//     },
//     {
//       type: "choropleth",
//       geojson: mapData.wind,
//       z: mapData.wind.features.map(f => f.properties.potential),
//       colorscale: "Blues",
//       showscale: false,
//       name: "Wind Potential"
//     },
//     {
//       type: "choropleth",
//       geojson: mapData.solar,
//       z: mapData.solar.features.map(f => f.properties.potential),
//       colorscale: "YlOrBr",
//       showscale: false,
//       name: "Solar Potential"
//     }
//   ]

//   return (
//     <div className="bg-white rounded-xl shadow p-4 mb-6">
//       <h3 className="text-lg font-bold mb-4">Kazakhstan Power Infrastructure & RES Potentials</h3>
//       <Plot data={layers} layout={layout} useResizeHandler style={{ width: "100%", height: "600px" }} />
//     </div>
//   )
// }

import React from "react"

export default function KazakhstanMap() {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <h3 className="text-lg font-bold mb-4">Kazakhstan Power Infrastructure & RES Potentials</h3>
      <div className="text-gray-500">Map data is not available at the moment.</div>
    </div>
  )
}
