"use client"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend, YAxis, ResponsiveContainer } from "recharts"
import { Rnd } from 'react-rnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import JsxParser from 'react-jsx-parser'

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)

  const handleParseError = (error: any) => {
    console.error('JSX Parsing Error:', error);
  };

  const ChartDeleteHandler = () => {
    alert('chart deleted')
  };

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const data = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 }
  ]

  const code = `<Rnd
  enableResizing={{
    top: true,
    right: true,
    bottom: true,
    left: true,
    topRight: true,
    bottomRight: true,
    bottomLeft: true,
    topLeft: true
  }}
>

  <button
  onClick={() => ChartDeleteHandler()}
  className="absolute t-right-1 top-8 z-50 rounded-full w-6 h-6 flex items-center justify-center shadow-sm"

  aria-label="Delete chart"
  >
  ×
  </button>

  <Card>
    <CardHeader>
      <CardTitle>Title</CardTitle>
    </CardHeader>
    <CardContent className="pb-4">
      <ResponsiveContainer width="100%" height={150}>
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
    </CardContent>
  </Card>
</Rnd>`

  if (!isMounted) return null

  return (
    <JsxParser
      components={{
        Rnd: Rnd as any,
        Card: Card  as any, 
        CardContent: CardContent as any, 
        CardHeader: CardHeader as any, 
        CardTitle: CardTitle as any,
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
      bindings={{ data,ChartDeleteHandler }}
      blacklistedAttrs={[]}
      onError={handleParseError}
    />
  )
}