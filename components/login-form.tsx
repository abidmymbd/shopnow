"use client"

// Login form with mock Google login using SweetAlert

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Eye, EyeOff, ShoppingBag } from "lucide-react"
import { login } from "@/lib/auth"
import { useAuth } from "@/lib/auth-context"
import { FaGoogle } from "react-icons/fa"

export function LoginForm() {
  // Form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const { setLoggedIn } = useAuth()

  // Normal email/password login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const result = await login(email, password)

    if (result.success) {
      setLoggedIn(true)
      router.push("/items")
      router.refresh()
    } else {
      setError(result.message || "Invalid email or password")
    }

    setIsLoading(false)
  }

  // Mock Google login using SweetAlert
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError("")

    await Swal.fire({
      icon: "success",
      title: "Google Login Successful",
      text: "You have logged in with Google",
      confirmButtonText: "Continue",
    })

    const result = await login("admin@example.com", "password123")

    if (result.success) {
      setLoggedIn(true)
      router.push("/items")
      router.refresh()
    } else {
      setError("Google login failed")
    }

    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="password123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Sign In */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Google Login */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
          </Button>

          {/* Demo credentials */}
          <div className="text-center text-sm text-gray-600 mt-4 p-3 bg-gray-100 rounded">
            <p className="font-bold mb-1">Demo Credentials</p>
            <p className="font-mono text-xs">
              Email: admin@example.com
            </p>
            <p className="font-mono text-xs">
              Password: password123
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
