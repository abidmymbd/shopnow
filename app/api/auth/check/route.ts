// This API endpoint checks if a user is logged in
// Called when the app first loads to restore the login state

import { getUser } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET() {
  // Call getUser() from auth.ts to check for a valid session
  const user = await getUser()

  // Return true if user exists (logged in), false otherwise
  return NextResponse.json({ authenticated: !!user })
}
