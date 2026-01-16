import { NextResponse } from "next/server"
import { getItems, addItem } from "@/lib/items"
import { getUser } from "@/lib/auth"

export async function GET() {
  const items = getItems()
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const newItem = addItem(body)
  return NextResponse.json(newItem, { status: 201 })
}
