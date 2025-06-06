import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function SolarMapHighQuality() {
  const [points, setPoints] = useState([])

  useEffect(() => {
    axios.get("/map/solar/points")
      .then((res) => setPoints(res.data))
      .catch((err) => console.error("Failed to load solar points:", err))
  }, [])

  if (!points.length) return <p>Loading solar map...</p>

  const lats = points.map(p => p.lat)
  const lons = points.map(p => p.lon)
  const values = points.map(p => p.value)

  return (
    <Plot
      data={[
        {
          type: "scattermapbox",
          lat: lats,
          lon: lons,
          mode: "markers",
          marker: {
            size: 6,
            color: values,
            colorscale: "OrRd",
            colorbar: { title: "GW" },
            cmin: 0,
            cmax: Math.max(...values),
          },
          text: values.map(v => `${v.toFixed(2)} GW`),
        },
      ]}
      layout={{
        title: "Solar Photovoltaic Potential [GW]",
        mapbox: {
          style: "open-street-map",
          center: { lat: 48, lon: 68 },
          zoom: 4,
        },
        margin: { t: 30, b: 0 },
      }}
      useResizeHandler
      style={{ width: "100%", height: "600px" }}
    />
  )
}
