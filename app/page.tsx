"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend, YAxis } from "recharts"

export default function Home() {
  // Use client-side state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false)

  // Only render the chart after component has mounted on the client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-6">Data Visualization</h1>

      {/* Only render the chart on the client after mounting */}
      {isMounted ? (
        <div className="w-full max-w-4xl overflow-x-auto">
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </div>
      ) : (
        <div className="w-[730px] h-[250px] bg-gray-100 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading chart...</p>
        </div>
      )}
    </main>
  )
}