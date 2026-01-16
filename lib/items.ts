export interface Item {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}


const defaultItems: Item[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description:
      "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals alike.",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Smart Watch",
    description:
      "Feature-packed smartwatch with health monitoring, GPS tracking, and seamless smartphone integration. Water-resistant and stylish design.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Camera Lens",
    description:
      "Professional-grade 50mm prime lens with f/1.4 aperture. Ideal for portrait photography and low-light conditions.",
    price: 299.99,
    image: "https://tse2.mm.bing.net/th/id/OIP.NZp1gAFA3JvFbHdA-zBNdwHaD4?rs=1&pid=ImgDetMain&o=7&rm=3?w=400&h=400&fit=crop",
    category: "Photography",
    inStock: true,
  },
  {
    id: 4,
    name: "Leather Backpack",
    description:
      "Handcrafted genuine leather backpack with multiple compartments. Perfect for daily commute or weekend adventures.",
    price: 149.99,
    image: "https://tse3.mm.bing.net/th/id/OIP.opKBpyDrQns0P4Y4Gha62wHaLH?rs=1&pid=ImgDetMain&o=7&rm=3?w=400&h=400&fit=crop",
    category: "Fashion",
    inStock: true,
  },
  {
    id: 5,
    name: "Running Shoes",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper. Designed for comfort during long runs.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Sports",
    inStock: true,
  },
  {
    id: 6,
    name: "Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness and color temperature. USB charging port included.",
    price: 49.99,
    image: "https://img.freepik.com/premium-photo/desk-with-lamp-book-it_959961-990.jpg?w=400&h=400&fit=crop",
    category: "Home",
    inStock: false,
  },
  {
    id: 7,
    name: "Coffee Maker",
    description: "Programmable coffee maker with thermal carafe. Brews up to 12 cups of delicious coffee.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    category: "Kitchen",
    inStock: true,
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound and 20-hour battery life. Waterproof and dustproof.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "Electronics",
    inStock: true,
  },
]

const STORAGE_KEY = "shop_items"
const NEXT_ID_KEY = "shop_next_id"

function isClient(): boolean {
  return typeof window !== "undefined"
}

function loadItems(): Item[] {
  if (!isClient()) return defaultItems

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return defaultItems
    }
  }
  // First time - save default items to localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultItems))
  return defaultItems
}

function saveItems(items: Item[]): void {
  if (isClient()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }
}

function getNextId(): number {
  if (!isClient()) return defaultItems.length + 1

  const stored = localStorage.getItem(NEXT_ID_KEY)
  if (stored) {
    return Number.parseInt(stored, 10)
  }
  const nextId = defaultItems.length + 1
  localStorage.setItem(NEXT_ID_KEY, nextId.toString())
  return nextId
}

function saveNextId(id: number): void {
  if (isClient()) {
    localStorage.setItem(NEXT_ID_KEY, id.toString())
  }
}

export function getItems(): Item[] {
  return loadItems()
}

export function getItemById(id: number): Item | undefined {
  const items = loadItems()
  return items.find((item) => item.id === id)
}

export function addItem(item: Omit<Item, "id">): Item {
  const items = loadItems()
  const nextId = getNextId()
  const newItem = { ...item, id: nextId }
  items.push(newItem)
  saveItems(items)
  saveNextId(nextId + 1)
  return newItem
}

export function updateItem(id: number, updates: Partial<Omit<Item, "id">>): Item | null {
  const items = loadItems()
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...updates }
  saveItems(items)
  return items[index]
}

export function deleteItem(id: number): boolean {
  const items = loadItems()
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) return false
  items.splice(index, 1)
  saveItems(items)
  return true
}
