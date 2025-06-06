import Plot from 'react-plotly.js'

export default function GenerationMixChart({ data }) {
  if (!data) return null

  const carriers = Object.keys(data)
  const values = Object.values(data)

  return (
    <div className="bg-white rounded-xl p-4 shadow mb-6">
      <h3 className="text-lg font-bold mb-2">Average Generation Mix</h3>
      <Plot
        data={[{
          type: 'bar',
          x: carriers,
          y: values,
          marker: { color: 'orange' },
        }]}
        layout={{
          width: 700,
          height: 400,
          margin: { t: 30, b: 100 },
          xaxis: { title: 'Carrier' },
          yaxis: { title: 'Average Power (MW)' },
        }}
      />
    </div>
  )
}