// This is the login page
// Users visit /login to sign into their account

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Navbar />

      {/* Main content - center the login form */}
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <LoginForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
