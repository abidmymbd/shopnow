"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, ShoppingBag, LogOut, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

export function Navbar() {
  // State for mobile menu (open/closed)
  const [isOpen, setIsOpen] = useState(false)

  // Get login status from auth context
  const { isLoggedIn, setLoggedIn } = useAuth()

  // For navigation
  const router = useRouter()

  // Handle logout click
  const handleLogout = async () => {
    // Call logout API
    await fetch("/api/auth/logout", { method: "POST" })

    // Update auth context
    setLoggedIn(false)

    // Redirect home
    router.push("/")
    router.refresh()
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span>ShopNow</span>
          </Link>

          {/* Desktop Navigation (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/items" className="text-sm font-medium hover:text-primary transition-colors">
              Products
            </Link>

            {/* Show logout/login button based on auth state */}
            {isLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild className="flex items-center gap-2 bg-transparent">
                <Link href="/login">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}

            <Button asChild>
              <Link href="/items">Shop Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation (shown when menu is open) */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium hover:text-primary">
                Home
              </Link>
              <Link href="/items" className="text-sm font-medium hover:text-primary">
                Products
              </Link>

              {isLoggedIn ? (
                <Button variant="outline" size="sm" onClick={handleLogout} className="w-fit bg-transparent">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button variant="outline" size="sm" asChild className="w-fit bg-transparent">
                  <Link href="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}

              <Button asChild className="w-fit">
                <Link href="/items">Shop Now</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
