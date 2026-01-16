"use server"


import { cookies } from "next/headers"

const DEMO_USER = {
  email: "admin@example.com",
  password: "password123",
  name: "Admin User",
}

// Login function - validates email/password and creates a session
export async function login(email: string, password: string) {
 
  await new Promise((resolve) => setTimeout(resolve, 500))


  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // Get the cookies storage
    const cookieStore = await cookies()

    // Save a session token (like a ticket that says "this person is logged in")
    cookieStore.set("auth-token", "authenticated", {
      httpOnly: true, // Can't be accessed from JavaScript (more secure)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "lax", // Helps prevent cross-site attacks
      maxAge: 60 * 60 * 24 * 7, // Token expires in 7 days
    })

    // Save the user's email
    cookieStore.set("user-email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    })

    return { success: true, message: "Login successful" }
  }

  // Wrong email or password
  return { success: false, message: "Invalid email or password" }
}

// Logout function - removes the session
export async function logout() {
  const cookieStore = await cookies()

  // Delete the session tokens
  cookieStore.delete("auth-token")
  cookieStore.delete("user-email")

  return { success: true }
}

// Get current user info - returns null if not logged in
export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")
  const email = cookieStore.get("user-email")

  // If token exists and email exists, user is logged in
  if (token?.value === "authenticated" && email?.value) {
    return {
      email: email.value,
      name: DEMO_USER.name,
      isAuthenticated: true,
    }
  }

  // Not logged in
  return null
}
