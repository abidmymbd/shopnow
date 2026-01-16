import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { FaFacebookF, FaLinkedinIn, FaYoutube, FaSpotify } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-[#ededed] border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span>ShopNow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your one-stop destination for quality products at amazing prices.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="bg-white shadow-md w-8 h-8 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#1877F2] hover:text-white"
                aria-label="Facebook">
                <FaFacebookF size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="bg-white shadow-md w-8 h-8 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-black hover:text-white"
                aria-label="Twitter">
                <FaXTwitter size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="bg-white shadow-md w-8 h-8 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#0A66C2] hover:text-white"
                aria-label="LinkedIn">
                <FaLinkedinIn size={15} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="bg-white shadow-md w-8 h-8 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#FF0000] hover:text-white"
                aria-label="YouTube">
                <FaYoutube size={15} />
              </a>
              <a href="https://spotify.com" target="_blank" rel="noopener noreferrer"
                className="bg-white shadow-md w-8 h-8 flex justify-center items-center rounded-full 
                                      transition-all duration-300 hover:bg-[#1DB954] hover:text-white"
                aria-label="Spotify">
                <FaSpotify size={15} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/items" className="hover:text-primary transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">Contact Us</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">FAQ</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">Shipping Info</span>
              </li>
              <li>
                <span className="hover:text-primary cursor-pointer transition-colors">Returns</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>123 Shop Street</li>
              <li>New York, NY 10001</li>
              <li>contact@shopnow.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
