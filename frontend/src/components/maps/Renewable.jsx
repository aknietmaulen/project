import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"

export default function RenewableMapHighQuality() {
  const [dataType, setDataType] = useState("solar")
  const [points, setPoints] = useState([])

  useEffect(() => {
    axios.get(`/map/${dataType}/points`)
      .then((res) => setPoints(res.data))
      .catch((err) => console.error(`Failed to load ${dataType} points:`, err))
  }, [dataType])

  if (!points.length) return <p>Loading {dataType} potential map...</p>

  const lats = points.map(p => p.lat)
  const lons = points.map(p => p.lon)
  const values = points.map(p => p.value)

  const isSolar = dataType === "solar"

  return (
    <div className="map-container">
      <div className="map-header">
        <h3>{isSolar ? "Solar" : "Wind"} Power Potential (GW)</h3>
        <select
          value={dataType}
          onChange={(e) => setDataType(e.target.value)}
        >
          <option value="solar">☀️ Solar</option>
          <option value="wind">🌪️ Wind</option>
        </select>
      </div>

      <div className="map-wrapper">
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
                colorscale: isSolar
                  ? "OrRd"
                  : [
                      [0.0, "rgba(255,255,255,0)"],
                      [0.01, "rgba(200,230,255,0.05)"],
                      [0.2, "rgb(158,202,225)"],
                      [0.5, "rgb(107,174,214)"],
                      [0.8, "rgb(33,113,181)"],
                      [1.0, "rgb(8,48,107)"]
                    ],
                colorbar: { title: "GW" },
                cmin: 0,
                cmax: Math.max(...values),
                opacity: 0.85
              },
              text: values.map(v => `${v.toFixed(2)} GW`)
            }
          ]}
          layout={{
            mapbox: {
              style: "open-street-map",
              center: { lat: 48, lon: 68 },
              zoom: 4
            },
            margin: { t: 30, b: 0 },
            height: 600,
            autosize: true
          }}
          useResizeHandler
          style={{ width: "100%", height: "600px" }}
        />
      </div>
    </div>
  )
}
