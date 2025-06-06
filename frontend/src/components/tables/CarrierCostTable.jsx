import { useEffect, useState } from "react"
import axios from "axios"

export default function CarrierCostTable() {
  const [table, setTable] = useState([])

  useEffect(() => {
    axios.get("/data/csv/cost_table_by_carriers.csv")
      .then(res => setTable(res.data))
  }, [])

  if (!table.length) return <p className="text-sm text-gray-500">Loading table...</p>

  const columns = Object.keys(table[0])

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Cost Table by Carrier (M€)</h3>
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            {columns.map(col => (
              <th key={col} className="border border-gray-300 px-2 py-1 text-left whitespace-nowrap">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              {columns.map(col => (
                <td
                  key={col}
                  className="border border-gray-300 px-2 py-1 text-right"
                >
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
