import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AddItemForm } from "@/components/add-item-form"
import { getUser } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function AddItemPage() {
  const user = await getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Add New Item</h1>
          <p className="text-muted-foreground mb-8">Fill in the details below to add a new product</p>
          <AddItemForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
