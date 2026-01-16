// This API endpoint logs the user out
// Deletes all session cookies so they're no longer logged in

import { logout } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function POST() {
  // Call logout() from auth.ts to delete session cookies
  await logout()

  // Return success response
  return NextResponse.json({ success: true })
}
