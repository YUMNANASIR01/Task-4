
'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart, Share2, BarChart2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Shopbottombar from "@/components/shopBottomBar/Shopbottombar";
import { Product } from "@/components/ourproducts/OurProducts";
import { client } from "@/sanity/lib/client";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products using the Sanity query
        const data = await client.fetch(`*[_type == 'product']{
          _id,
          title,
          price,
          description,
          discountPercentage,
          isNew,
          "imageUrl": productImage.asset->url,
          tags
        }`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setErrorMessage("Unable to load products. Please try again later.");
      } finally {
        setIsLoading(false); // Stop loading spinner
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {/* Banner */}
      <section className="bg-[url('/blogMainImage.png')] bg-cover bg-center py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block w-16 h-16 bg-[url('/logo1.png')] mb-4" />
          <h1 className="text-3xl md:text-4xl font-medium mb-4">Shop</h1>
          <div className="flex items-center justify-center gap-2 text-sm">
            <a href="#" className="hover:underline">
              Home
            </a>
            <span>
              <Image src={"/rightA.png"} width={20} height={20} alt="arrow" />
            </span>
            <span>Shop</span>
          </div>
        </div>
      </section>

      {/* Main Product Block */}
      <div className="container mx-auto p-4 md:p-6">
        {isLoading ? (
          <div className="text-center text-gray-500 text-lg">Loading products...</div>
        ) : errorMessage ? (
          <div className="text-center text-red-500 text-lg">{errorMessage}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: Product, index: number) => (
              <Card key={index} className="group relative overflow-hidden shadow-md">
                <div className="relative aspect-square">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />

                  {/* Discount badge */}
                  {product.discountPercentage && (
                    <Badge className="absolute left-4 top-4 bg-red-500">-{product.discountPercentage}%</Badge>
                  )}

                  {/* New product badge */}
                  {product.isNew && (
                    <Badge className="absolute left-4 top-4 bg-emerald-500">New</Badge>
                  )}

                  {/* Icons */}
                  <div className="absolute right-4 top-4 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button size="icon" variant="secondary">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <BarChart2 className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="secondary">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Card content */}
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">$ {product.price}</span>
                    {product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        $ {(product.price * 1.2).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/shop/id?id=${product._id}&title=${product.title}&price=${product.price}&imageUrl=${product.imageUrl}&description=${product.description}&discountPercentage=${product.discountPercentage}&isNew=${product.isNew}&tags=${product.tags}`}
                  >
                    <Button className="w-full md:w-auto">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to cart
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        {!errorMessage && products.length > 0 && (
          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            <Button variant="outline" className="w-12">
              1
            </Button>
            <Button variant="outline" className="w-12">
              2
            </Button>
            <Button variant="outline" className="w-12">
              3
            </Button>
            <Button variant="outline" className="w-20">
              Next
            </Button>
          </div>
        )}
      </div>

      <Shopbottombar />
    </>
  );
}






