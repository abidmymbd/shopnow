import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-15 g:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
              Discover Amazing Products at <span className="text-primary">Unbeatable Prices</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Shop the latest trends and find everything you need. Quality products, fast shipping, and exceptional
              service.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/items">
                  Browse Products <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=500&fit=crop"
              alt="Shopping showcase"
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[6/5]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
