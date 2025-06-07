import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function WindMapHighQuality() {
  const [points, setPoints] = useState([])

  useEffect(() => {
    axios.get("/map/wind/points")
      .then((res) => setPoints(res.data))
      .catch((err) => console.error("Failed to load wind points:", err))
  }, [])

  if (!points.length) return <p>Loading wind potential map...</p>

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
                size: values.map(v => Math.max(3, v / 200)),
                sizemode: "area",
                sizeref: 0.4,
                color: values,
                colorscale: [
                [0.0, "rgba(255,255,255,0)"],    // invisible
                [0.01, "rgba(200,230,255,0.05)"], // barely visible
                [0.2, "rgb(158,202,225)"],
                [0.5, "rgb(107,174,214)"],
                [0.8, "rgb(33,113,181)"],
                [1.0, "rgb(8,48,107)"]
                ],
                colorbar: { title: "GW" },
                cmin: 0,
                cmax: Math.max(...values), // or set a fixed value like 5000
                opacity: 0.9
            },
            text: values.map(v => `${v.toFixed(2)} GW`),
            },
        ]}
        layout={{
            title: "Wind Power Potential [GW]",
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
