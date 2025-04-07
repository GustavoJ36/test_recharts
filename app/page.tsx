"use client"
import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend, YAxis, ResponsiveContainer } from "recharts"
import { Rnd } from "react-rnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import JsxParser from "react-jsx-parser"

// Define types for chart position and size
type ChartPosition = {
  x: number
  y: number
  width: number
  height: number
}

export default function Home() {
  const [isMounted, setIsMounted] = useState(false)
  const [chartPosition, setChartPosition] = useState<ChartPosition>({
    x: 0,
    y: 0,
    width: 400,
    height: 300,
  })

  const handleParseError = (error: any) => {
    console.error("JSX Parsing Error:", error)
  }

  const ChartDeleteHandler = () => {
    alert("chart deleted")
  }

  // Save position and size to localStorage when they change
  const savePositionToLocalStorage = (position: ChartPosition) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chartPosition", JSON.stringify(position))
    }
  }

  // Handle position and size changes
  const handlePositionChange = (x: number, y: number) => {
    const newPosition = { ...chartPosition, x, y }
    setChartPosition(newPosition)
    savePositionToLocalStorage(newPosition)
  }

  const handleResizeStop = (width: number, height: number) => {
    const newPosition = { ...chartPosition, width, height }
    setChartPosition(newPosition)
    savePositionToLocalStorage(newPosition)
  }

  useEffect(() => {
    setIsMounted(true)

    // Load position and size from localStorage on mount
    if (typeof window !== "undefined") {
      const savedPosition = localStorage.getItem("chartPosition")
      if (savedPosition) {
        try {
          setChartPosition(JSON.parse(savedPosition))
        } catch (e) {
          console.error("Error parsing saved chart position:", e)
        }
      }
    }
  }, [])

  const data = [
    { name: "Page A", uv: 4000, pv: 2400 },
    { name: "Page B", uv: 3000, pv: 1398 },
  ]

  const code = `<Rnd
  position={{ x: ${chartPosition.x}, y: ${chartPosition.y} }}
  size={{ width: ${chartPosition.width}, height: ${chartPosition.height} }}
  onDragStop={(e, d) => handlePositionChange(d.x, d.y)}
  onResizeStop={(e, direction, ref, delta, position) => {
    handleResizeStop(parseInt(ref.style.width), parseInt(ref.style.height));
    handlePositionChange(position.x, position.y);
  }}
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
  className="absolute -right-2 -top-2 z-50 rounded-full w-6 h-6 flex items-center justify-center shadow-sm bg-white hover:bg-gray-100 text-gray-500 hover:text-gray-700"
  aria-label="Delete chart"
  >
  ×
  </button>

  <Card className="w-full h-full">
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
        Card: Card as any,
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
        ResponsiveContainer: ResponsiveContainer as any,
      }}
      jsx={code}
      bindings={{
        data,
        ChartDeleteHandler,
        chartPosition,
        handlePositionChange,
        handleResizeStop,
      }}
      blacklistedAttrs={[]}
      onError={handleParseError}
    />
  )
}

