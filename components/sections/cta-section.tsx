import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-15">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=400&fit=crop"
            alt="Special offer"
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
            <div className="p-8 md:p-12 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get 20% Off Your First Order</h2>
              <p className="text-white/80 mb-6">
                Sign up today and receive an exclusive discount on your first purchase. Don't miss out!
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/login">Sign Up Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
