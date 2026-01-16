
"use server"

import { getUser } from "./auth"

export async function createItem(formData: FormData) {
  // Get current user from session
  const user = await getUser()

  // If not logged in, reject the request
  if (!user) {
    return { success: false, message: "You must be logged in to add items" }
  }

  // Extract form field values
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const price = Number.parseFloat(formData.get("price") as string)
  const category = formData.get("category") as string
  const image = formData.get("image") as string
  const inStock = formData.get("inStock") === "on"

  // Validate that all required fields are provided
  if (!name || !description || !price || !category || !image) {
    return { success: false, message: "Please fill in all required fields" }
  }

  // Simulate network delay (optional)
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you'd save to a database here
  // For now, we're just creating a mock item object
  const newItem = {
    id: Date.now(),
    name,
    description,
    price,
    category,
    image,
    inStock,
    createdBy: user.email,
  }

  return { success: true, item: newItem }
}
