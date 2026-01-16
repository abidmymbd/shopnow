"use client"

import { useEffect, useState, use } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getItemById, type Item } from "@/lib/items"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart, Check, X, Pencil } from "lucide-react"
import Link from "next/link"
import { DeleteItemButton } from "@/components/delete-item-button"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function ItemDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const foundItem = getItemById(Number.parseInt(id))
    if (!foundItem) {
      router.push("/items")
    } else {
      setItem(foundItem)
    }
    setLoading(false)
  }, [id, router])

  if (loading) {
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
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <Button variant="ghost" asChild>
              <Link href="/items">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
              </Link>
            </Button>

            {isLoggedIn && (
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/items/${id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                  </Link>
                </Button>
                <DeleteItemButton itemId={item.id} itemName={item.name} />
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-square overflow-hidden rounded-2xl border">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3">
                  {item.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold">{item.name}</h1>
              </div>

              <div className="flex items-center gap-2">
                {item.inStock ? (
                  <>
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <>
                    <X className="h-5 w-5 text-red-500" />
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              <p className="text-2xl md:text-3xl font-bold text-primary">${item.price.toFixed(2)}</p>

              <div className="border-t pt-6">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex-1" disabled={!item.inStock}>
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {item.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                  Add to Wishlist
                </Button>
              </div>

              <div className="border rounded-lg p-4 bg-muted/30 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{item.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Product ID</span>
                  <span className="font-medium">#{item.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium">{item.inStock ? "Available" : "Unavailable"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
