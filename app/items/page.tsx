import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ItemList } from "@/components/item-list"
import { getUser } from "@/lib/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function ItemsPage() {
  const user = await getUser()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">All Products</h1>
              <p className="text-muted-foreground mt-1">Browse our collection of amazing products</p>
            </div>
            {user && (
              <Button asChild>
                <Link href="/items/add">
                  <Plus className="mr-2 h-4 w-4" /> Add New Item
                </Link>
              </Button>
            )}
          </div>
          <ItemList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
