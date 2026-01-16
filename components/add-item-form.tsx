"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { showSuccess, showError } from "@/lib/sweetalert"
import { addItem } from "@/lib/items"

const categories = ["Electronics", "Fashion", "Home", "Sports", "Photography", "Kitchen"]

export function AddItemForm() {
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const image = formData.get("image") as string
    const inStock = formData.get("inStock") === "on"

    if (!name || !description || !price || !category || !image) {
      showError("Error", "All fields are required")
      setLoading(false)
      return
    }

    try {
      addItem({
        name,
        description,
        price,
        category,
        image,
        inStock,
      })

      showSuccess("Success!", "Item has been added successfully.")
      router.push("/items")
    } catch {
      showError("Error", "Failed to add item")
    }

    setLoading(false)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input id="name" name="name" placeholder="Enter product name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea id="description" name="description" placeholder="Enter product description" rows={4} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price ($) *</Label>
              <Input id="price" name="price" type="number" step="0.01" min="0" placeholder="99.99" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL *</Label>
            <Input id="image" name="image" type="url" placeholder="https://example.com/image.jpg" required />
            <p className="text-xs text-muted-foreground">
              Use an image URL from Unsplash or any public image hosting service
            </p>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="inStock" className="font-medium">
                In Stock
              </Label>
              <p className="text-sm text-muted-foreground">Is this item available for purchase?</p>
            </div>
            <Switch id="inStock" name="inStock" defaultChecked />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Adding..." : "Add Item"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
