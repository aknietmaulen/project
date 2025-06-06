import { useEffect, useState } from "react"
import axios from "axios"
import "./SystemCostTable.css"

export default function SystemCostTable({ resShare }) {
  const [table, setTable] = useState([])

  useEffect(() => {
    axios
      .get(`/scenario/system-cost-breakdown?res=${resShare}`)
      .then(res => setTable(res.data))
      .catch(err => console.error("Failed to load table", err))
  }, [resShare])

  return (
    <div className="cost-table-card">
      <h3 className="table-title">System cost breakdown (RES {Math.round(resShare * 100)}%)</h3>
      <table className="cost-table">
        <thead>
          <tr>
            <th>Cost types</th>
            <th>Carriers</th>
            <th>€M</th>
          </tr>
        </thead>
        <tbody>
            {table.map((row, idx) => {
                const isTotal = row.carrier.toLowerCase() === "total"
                const isCapital = row.cost_type === "Capital" && row.carrier !== "Total"
                const isOperational = row.cost_type === "Operational" && row.carrier !== "Total"

                let rowClass = ""
                if (isTotal) rowClass = "total-row"
                else if (isCapital) rowClass = "cost-type-capital"
                else if (isOperational) rowClass = "cost-type-operational"

                return (
                <tr key={idx} className={rowClass}>
                    <td>{row.cost_type}</td>
                    <td>{row.carrier}</td>
                    <td>{row.value.toFixed(2)}</td>
                </tr>
                )
            })}
        </tbody>

      </table>
    </div>
  )
}
