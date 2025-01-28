
"use client"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import CommentSection from "../comment.tsx/page"
import { Star } from "lucide-react"

export default function ProductDetails({
  productImage,
  productDescription,
}: { productImage: string; productDescription: string }) {
  const [products, setProducts] = useState([])
  const [reviews] = useState([
    { id: 1, user: "John D.", rating: 5, comment: "Excellent product quality!", date: "2024-03-15" },
    { id: 2, user: "Sarah M.", rating: 4, comment: "Good value for money, fast shipping.", date: "2024-03-14" },
  ])

  const productSpecs = [
    { label: "Weight", value: "1.5 kg" },
    { label: "Dimensions", value: "30 × 20 × 15 cm" },
    { label: "Material", value: "Premium Cotton" },
    { label: "Care Instructions", value: "Machine wash cold" },
  ]

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("*[_type == 'product']")
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-2 mb-6">
            <TabsTrigger value="description" className="text-xs sm:text-base">
              Description
            </TabsTrigger>
            <TabsTrigger value="additional" className="text-xs sm:text-base">
              Additional Info
            </TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs sm:text-base">
              Reviews [{reviews.length}]
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="space-y-6 mt-8 mb-8">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed mb-6">{productDescription}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#fdf6f0] rounded-lg p-4">
                <Image
                  src={productImage || "/placeholder.svg"}
                  alt="Product main view"
                  width={605}
                  height={348}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="bg-[#fdf6f0] rounded-lg p-4">
                <Image
                  src={productImage || "/placeholder.svg"}
                  alt="Product alternative view"
                  width={605}
                  height={348}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="additional">
            <div className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Specifications</h3>
                <dl className="grid grid-cols-1 gap-4">
                  {productSpecs.map((spec, index) => (
                    <div
                      key={spec.label}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between ${
                        index !== productSpecs.length - 1 ? "pb-4 border-b border-gray-200" : ""
                      }`}
                    >
                      <dt className="text-sm font-medium text-gray-600 min-w-[120px]">{spec.label}</dt>
                      <dd className="mt-1 sm:mt-0 text-sm text-gray-900 font-normal">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="prose max-w-none mt-6">
              <div className="text-gray-600 space-y-8">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs sm:text-sm ml-auto">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-2 text-sm sm:text-base">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <CommentSection />
    </>
  )
}