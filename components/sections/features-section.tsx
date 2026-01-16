import { Truck, Shield, CreditCard, Headphones } from "lucide-react"

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: CreditCard,
    title: "Easy Returns",
    description: "30-day hassle-free return policy",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round the clock customer support",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-background shadow-sm"
            >
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
