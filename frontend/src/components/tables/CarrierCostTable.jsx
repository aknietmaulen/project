import { useEffect, useState } from "react"
import axios from "axios"
import "../../App.css"
export default function CarrierCostTable() {
  const [table, setTable] = useState([])

  useEffect(() => {
    axios.get("/overview/carrier-costs")
      .then(res => setTable(res.data))
  }, [])

  if (!table.length) return <p className="text-sm text-gray-500">Loading table...</p>

  const columns = Object.keys(table[0])

  return (
    <div className="carrier-table-wrapper">
      <h3 className="carrier-table-title">Cost Table by Carrier (M€)</h3>
      <div className="carrier-table-container">
        <table className="carrier-table">

          <thead>
            <tr>
              {columns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
