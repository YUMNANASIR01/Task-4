// src\components\ourproducts\OurProducts.tsx
import React from 'react'
import { ProductCard } from '../productCard/productCard'
import Link from 'next/link'

export interface Product {
  salePercentage: any;
  name: string;
  imageUrl: string;
  price: number;
  tags: string[];
  discountPercentage: number;
  description: string;
  isNew: boolean;
  _id: string;
  title: string;
}


async function OurProducts() {
   
  const res = await fetch("https://template6-six.vercel.app/api/products")
  const products = await res.json()
  
  return (
    <>
      {/* Product Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Section Title */}
          <h2 className="mb-8 text-center text-3xl font-bold">Our Products</h2>
          
          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 exsm:pl-0  justify-items-center">
            {/* Mapping through products and displaying each product card */}
            {products.map((product: Product, index: number) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>

          {/* Show More Button */}
          <div className="mt-8 flex justify-center">
            <Link href="/shop">
            <button className="border-2 border-[#B88E2F] px-8 py-2 text-[#B88E2F] hover:bg-[#B88E2F] hover:text-white transition-colors">
              Show More
            </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default OurProducts