"use client"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend, YAxis, ResponsiveContainer } from "recharts"
import { Rnd } from 'react-rnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import JsxParser from 'react-jsx-parser'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const data = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 }
  ]

  const code = `
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  `

  if (!isMounted) return null

  return (
    <Rnd
      enableResizing={{
        top: false,
        right: true,
        bottom: false,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
        </CardHeader>
        <CardContent className="pb-4">
            <JsxParser
              components={{  
                Bar: Bar as any,
                BarChart: BarChart as any,
                CartesianGrid: CartesianGrid as any,
                XAxis: XAxis as any,
                Tooltip: Tooltip as any,
                Legend: Legend as any,
                YAxis: YAxis as any,
                ResponsiveContainer: ResponsiveContainer as any
              }}
              jsx={code}
              bindings={{ data }}
            />
        </CardContent>
      </Card>
    </Rnd>
  )
}