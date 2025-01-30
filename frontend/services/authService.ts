const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"

interface AuthResponse {
  user: User
  token: string
}

interface User {
  id: string
  email: string
  name: string
}

export const authService = {
  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      return data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    }
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid email or password")
      }

      if (data.token) {
        localStorage.setItem("token", data.token)
      }

      return data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  },

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem("token")
    if (!token) return null

    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token")
          return null
        }
        throw new Error("Failed to get user")
      }

      const data = await response.json()
      return data.user
    } catch (error) {
      console.error("Get current user error:", error)
      localStorage.removeItem("token")
      return null
    }
  },

  logout() {
    localStorage.removeItem("token")
  },
}

