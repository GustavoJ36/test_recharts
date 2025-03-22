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
    {name: "Page A",uv: 4000,pv: 2400},
    {name: "Page B",uv: 3000,pv: 1398}
  ]

  return (
    <>
      {/* Only render the chart on the client after mounting */}
      {isMounted ? (
          <BarChart width={300} height={180} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
      ) : (
        <div>
          <p>Loading chart...</p>
        </div>
      )}
    </>
  )
}