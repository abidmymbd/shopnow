"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

type AuthContextType = {
  isLoggedIn: boolean
  setLoggedIn: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)


export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in when app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call API to check if there's a valid session
        const response = await fetch("/api/auth/check")
        const data = await response.json()
        setIsLoggedIn(data.authenticated)
      } catch (error) {
        // If request fails, user is not logged in
        setIsLoggedIn(false)
      }
    }

    checkAuth()
  }, [])

  const setLoggedIn = useCallback((value: boolean) => {
    setIsLoggedIn(value)
  }, [])

  return (
    // Provide the authentication info to all child components
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>{children}</AuthContext.Provider>
  )
}

// Custom hook to use auth info in any component
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used inside <AuthProvider>")
  }
  return context
}
