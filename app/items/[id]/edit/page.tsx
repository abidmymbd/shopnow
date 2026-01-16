"use client"

import type React from "react"

import { useEffect, useState, use } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { showSuccess, showError } from "@/lib/sweetalert"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { getItemById, updateItem, type Item } from "@/lib/items"

export default function EditItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { isLoggedIn, checkAuth } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [item, setItem] = useState<Item | null>(null)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    const init = async () => {
      await checkAuth()
      setAuthChecked(true)
    }
    init()
  }, [checkAuth])

  useEffect(() => {
    if (!authChecked) return

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const foundItem = getItemById(Number(id))
    if (!foundItem) {
      router.push("/items")
    } else {
      setItem(foundItem)
    }
    setLoading(false)
  }, [id, isLoggedIn, authChecked, router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!item) return

    setSaving(true)

    const updatedItem = updateItem(Number(id), item)

    if (updatedItem) {
      showSuccess("Updated!", `"${item.name}" has been updated successfully.`)
      router.push(`/items/${id}`)
    } else {
      showError("Error", "Failed to update the item. Please try again.")
    }
    setSaving(false)
  }

  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </main>
        <Footer />
      </div>
    )
  }

  if (!item) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link href={`/items/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
            </Link>
          </Button>

          <div className="border rounded-xl p-6 bg-card">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={item.name}
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={item.description}
                  onChange={(e) => setItem({ ...item, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => setItem({ ...item, price: Number.parseFloat(e.target.value) })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={item.category}
                    onChange={(e) => setItem({ ...item, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={item.image}
                  onChange={(e) => setItem({ ...item, image: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="inStock"
                  checked={item.inStock}
                  onCheckedChange={(checked) => setItem({ ...item, inStock: checked })}
                />
                <Label htmlFor="inStock">In Stock</Label>
              </div>

              <Button type="submit" className="w-full" disabled={saving}>
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
