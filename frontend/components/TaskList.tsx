"use client"

import type { Task } from "@/contexts/TaskContext"
import { Card, CardContent } from "@/components/ui/card"

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium dark:text-gray-200">{task.title}</h3>
                {task.description && <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>}
              </div>
              <div className="text-sm font-medium">{task.status}</div>
            </div>
          </CardContent>
        </Card>
      ))}
      {tasks.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400">No tasks found</p>}
    </div>
  )
}

