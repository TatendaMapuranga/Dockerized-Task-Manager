"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ui/theme-toggle"

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">TaskManager</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/tasks" className="transition-colors hover:text-foreground/80 text-foreground">
              Tasks
            </Link>
            <Link href="/calendar" className="transition-colors hover:text-foreground/80 text-foreground">
              Calendar
            </Link>
            <Link href="/notes" className="transition-colors hover:text-foreground/80 text-foreground">
              Notes
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Add search or other elements here if needed */}
          </div>
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </nav>
  )
}

