"use client"

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { showSuccess, showError, showConfirm } from "@/lib/sweetalert"
import { deleteItem } from "@/lib/items"

interface DeleteItemButtonProps {
  itemId: number
  itemName: string
}

export function DeleteItemButton({ itemId, itemName }: DeleteItemButtonProps) {
  const router = useRouter()

  const handleDelete = async () => {
    const confirmed = await showConfirm(
      "Delete Item?",
      `Are you sure you want to delete "${itemName}"? This action cannot be undone.`,
    )

    if (!confirmed) return

    const success = deleteItem(itemId)
    if (success) {
      showSuccess("Deleted!", `"${itemName}" has been deleted successfully.`)
      router.push("/items")
    } else {
      showError("Error", "Failed to delete the item. Please try again.")
    }
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      <Trash2 className="mr-2 h-4 w-4" /> Delete
    </Button>
  )
}
