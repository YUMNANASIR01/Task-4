'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Search, Heart, ShoppingCart, UserCircle, X, Menu } from 'lucide-react'
import { useAtom } from 'jotai'
import { cartNumber } from '@/globalState/globalState'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  const [cartNum] = useAtom(cartNumber);
 



  return (
    <nav className="relative w-full bg-white z-50">
      {/* Main container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-black/5"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Main menu"
            >
              <Menu className="block h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Logo"
                height={32}
                width={50}
                className="h-8 w-auto sm:h-10"
              />
              <span className="font-bold font-montserrat text-xl sm:text-2xl md:text-[25px]">
                Furniro
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 px-2 lg:ml-[400px] lg:justify-start ">
            <div className="flex space-x-8">
              <Link
                href="/"
                className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
              >
                Shop
              </Link>
              <Link
                href="/blog"
                className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Icons Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              aria-label="Account"
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <UserCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              aria-label="Search"
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              aria-label="Wishlist"
              className="p-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <Link href="/cart">
              <button
                aria-label="Shopping Cart"
                className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartNum>0 && <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {cartNum}
                </span>}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="pt-5 pb-6 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  height={32}
                  width={50}
                  className="h-8 w-auto"
                />
                <span className="ml-2 font-bold font-montserrat text-xl">
                  Furniro
                </span>
              </div>
              <button
                type="button"
                className="rounded-md p-2 text-black hover:bg-black/5"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-4">
                <Link
                  href="/"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors px-3 py-2 rounded-md hover:bg-black/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors px-3 py-2 rounded-md hover:bg-black/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Shop
                </Link>
                <Link
                  href="/blog"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors px-3 py-2 rounded-md hover:bg-black/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  className="text-base font-medium font-poppins text-black hover:text-black/70 transition-colors px-3 py-2 rounded-md hover:bg-black/5"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

