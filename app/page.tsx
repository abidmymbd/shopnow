import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { ProductsPreview } from "@/components/sections/products-preview"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { StatsSection } from "@/components/sections/stats-section"
import { CTASection } from "@/components/sections/cta-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ProductsPreview />
        <StatsSection />
        <TestimonialsSection />
        <CTASection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
