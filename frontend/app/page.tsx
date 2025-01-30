"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import UserDashboard from "@/components/UserDashboard"

export default function Home() {
  const { user } = useAuth()

  if (user) {
    return <UserDashboard />
  }

  return (
    <div className="container px-4 md:px-6 py-6 md:py-10">
      <div className="mx-auto max-w-4xl space-y-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Welcome to TaskManager</h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Organize your tasks and boost your productivity!
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="font-bold">Create Tasks</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Easily create and manage your tasks in one place
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 space-y-2">
              <h3 className="font-bold">Track Progress</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monitor your task completion and productivity</p>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 md:col-span-1">
            <CardContent className="p-6 space-y-2">
              <h3 className="font-bold">Collaborate</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share tasks and work together with your team</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <Link href="/register">
            <Button size="lg" className="w-full min-[400px]:w-auto">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

