"use client"

import { Card, CardContent } from "@/components/ui/card"

interface TaskStatsProps {
  tasksSet: number
  complete: number
  notes: number
  todo: number
}


export default function TaskStats({ tasksSet, complete, notes, todo }: TaskStatsProps) {
  const stats = [
    { name: "Tasks set", value: tasksSet, icon: "📋" },
    { name: "Complete", value: complete, icon: "✓" },
    { name: "Notes", value: notes, icon: "📝" },
    { name: "Todo", value: todo, icon: "📌" },
  ]

  return (
    <Card className="mb-8">
      <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {stats.map((stat) => (
          <div key={stat.name} className="text-center">
            <div className="flex items-center justify-center gap-2">
              <span>{stat.icon}</span>
              <span className="font-medium dark:text-gray-200">{stat.name}</span>
            </div>
            <p className="mt-1 text-2xl font-semibold dark:text-white">{stat.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

