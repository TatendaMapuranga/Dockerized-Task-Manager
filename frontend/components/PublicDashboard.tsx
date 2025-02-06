import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PublicDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Task Manager</h1>
      <p className="text-xl">Organize your tasks and boost your productivity!</p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Create Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Easily create and manage your tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Track Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Monitor your task completion and productivity</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collaborate</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Share tasks and work together with your team</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center space-x-4">
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/register">Register</Link>
        </Button>
      </div>
    </div>
  )
}

