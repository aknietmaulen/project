import { useEffect, useState } from "react"
import Plot from "react-plotly.js"
import axios from "axios"
// import "../../App.css"

export default function RenewableMapHighQuality() {
  const [dataType, setDataType] = useState("solar") // default: solar
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
    <div className="bg-white shadow rounded-xl p-4 mt-2" style={{ margin: "10px auto" }}>
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
        }}
        >
        <div style={{ flex: 1, textAlign: "center" }}>
            <h3 className="text-lg font-bold" style={{ margin: 0 }}>
            {isSolar ? "Solar" : "Wind"} Power Potential (GW)
            </h3>
        </div>

        <div style={{ marginLeft: "auto" }}>
            <select
            value={dataType}
            onChange={(e) => setDataType(e.target.value)}
            style={{
                padding: "8px 14px",
                fontSize: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                marginLeft: "10px",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f0f0f0")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f9f9f9")}
            >
            <option value="solar">☀️ Solar</option>
            <option value="wind">🌪️ Wind</option>
            </select>
        </div>
        </div>


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
                    [1.0, "rgb(8,48,107)"],
                  ],
              colorbar: { title: "GW" },
              cmin: 0,
              cmax: Math.max(...values),
              opacity: 0.85,
            },
            text: values.map(v => `${v.toFixed(2)} GW`),
          },
        ]}
        layout={{
          mapbox: {
            style: "open-street-map",
            center: { lat: 48, lon: 68 },
            zoom: 4,
          },
          margin: { t: 30, b: 0 },
          height: 600,
          autosize: true,
        }}
        useResizeHandler
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  )
}
