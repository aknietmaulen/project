export default function MetricCard({ res, co2, cost }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="font-bold">RES {Math.round(res * 100)}%</h3>
      <p>CO₂ Emissions: {co2.toFixed(2)} Mt</p>
      <p>Total Cost: ${cost.toFixed(2)} M</p>
    </div>
  )
}
