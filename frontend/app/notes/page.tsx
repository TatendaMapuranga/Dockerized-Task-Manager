"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"

export default function NotesPage() {
  const { theme } = useTheme()

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Notes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <AlertCircle size={64} className={`${theme === "dark" ? "text-yellow-300" : "text-yellow-500"}`} />
          <p className="text-center text-lg font-medium">This functionality is still in the works</p>
        </CardContent>
      </Card>
    </div>
  )
}

