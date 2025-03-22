"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend, YAxis } from "recharts"
import { Rnd } from 'react-rnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const data = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 }
  ]

  if (!isMounted) return null

  return (
    <Rnd>
      <Card
        className={``}
      >
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
          <BarChart width={300} height={180} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </Card>
    </Rnd>
  )
}