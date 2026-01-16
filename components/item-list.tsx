"use client"

import type React from "react"

import Link from "next/link"
import { getItems, deleteItem, type Item } from "@/lib/items"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { showSuccess, showError, showConfirm } from "@/lib/sweetalert"
import { useState, useEffect } from "react"

export function ItemList() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    setItems(getItems())
  }, [])

  const handleDelete = async (e: React.MouseEvent, itemId: number, itemName: string) => {
    e.preventDefault()
    e.stopPropagation()

    const confirmed = await showConfirm(
      "Delete Item?",
      `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    )

    if (!confirmed) return

    const success = deleteItem(itemId)
    if (success) {
      setItems(items.filter((item) => item.id !== itemId))
      showSuccess("Deleted!", `"${itemName}" has been deleted successfully.`)
    } else {
      showError("Error", "Failed to delete the item. Please try again.")
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300 relative"
        >
          <Link href={`/items/${item.id}`}>
            <div className="aspect-square overflow-hidden relative">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {!item.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>
            <div className="p-4">
              <Badge variant="secondary" className="mb-2">
                {item.category}
              </Badge>
              <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
              <p className="text-lg font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
            </div>
          </Link>

          {isAuthenticated && (
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                variant="secondary"
                className="h-8 w-8"
                onClick={(e) => {
                  e.preventDefault()
                  router.push(`/items/${item.id}/edit`)
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                className="h-8 w-8"
                onClick={(e) => handleDelete(e, item.id, item.name)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
