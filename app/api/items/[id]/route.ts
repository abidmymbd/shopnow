import { NextResponse } from "next/server"
import { deleteItem, updateItem, getItemById } from "@/lib/items"
import { getUser } from "@/lib/auth"

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const success = deleteItem(Number(id))

  if (success) {
    return NextResponse.json({ message: "Item deleted" })
  }
  return NextResponse.json({ error: "Item not found" }, { status: 404 })
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const updatedItem = updateItem(Number(id), body)

  if (updatedItem) {
    return NextResponse.json(updatedItem)
  }
  return NextResponse.json({ error: "Item not found" }, { status: 404 })
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const item = getItemById(Number(id))

  if (item) {
    return NextResponse.json(item)
  }
  return NextResponse.json({ error: "Item not found" }, { status: 404 })
}
