"use client"

import React, { useEffect, useRef, useState } from "react"
import { ProductProvider } from "@lib/context/product-context"
import { useIntersection } from "@lib/hooks/use-in-view"
import RelatedProducts from "@modules/products/components/related-products"
import ImageGallery from "@modules/products/components/image-gallery"
import MobileActions from "@modules/products/components/mobile-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import ProductActions from "../components/product-actions"
import { Heart } from "lucide-react"
import { Image } from "@medusajs/medusa"
import { useSearchParams } from "next/navigation"

type ProductTemplateProps = {
  product: PricedProduct
}

type GroupImagesByColorVariant = {
  [key: string]: { images: Image[] }
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const [isOnboarding, setIsOnboarding] = useState<boolean>(false)
  const infoRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(infoRef, "0px")
  const [imagesByColorVariant, setImagesByColorVariant] =
    useState<GroupImagesByColorVariant>({})
  const params = useSearchParams()

  useEffect(() => {
    const onboarding = window.sessionStorage.getItem("onboarding")
    setIsOnboarding(onboarding === "true")
  }, [])

  useEffect(() => {
    // Find color options
    const colorOptions = product?.options?.filter(
      (option) => option.title.toLowerCase() === "color"
    )

    const imagesByColorVariant: GroupImagesByColorVariant = {}
    product?.variants.forEach((v) => {
      if (v.options) {
        var color = ""
        v.options.map((option) => {
          if (option.option_id === colorOptions![0].id) {
            color = option.value
          }
        })
        if (
          !imagesByColorVariant[color] ||
          imagesByColorVariant[color].images.length === 0
        ) {
          imagesByColorVariant[color] = { images: v.images! }
        }
      }
    })
    setImagesByColorVariant(imagesByColorVariant)
  }, [])

  // When query params is not present pass the default selected variant
  const defaultVariant = product?.options?.filter(
    (option) => option.title.toLowerCase() === "color"
  )[0].values[0].value

  const variantColor = params.get("color")
    ? params.get("color")
    : defaultVariant

  return (
    <ProductProvider product={product}>
      <div className="content-container flex p-0 relative">
        <div className="block min-w-[50%] max-w-[50%] 2xl:min-w-[65%] 2xl:max-w-[65%] relative">
          <ImageGallery
            images={imagesByColorVariant[variantColor!]?.images || []}
          />
        </div>
        <div className="block top-[130px] h-0 sticky min-w-[44px] max-w-[44px] -ml-[44px] mb-[200px]">
          <div className="absolute block top-1/2 right-1/2 w-full h-auto">
            <button className="h-auto w-full z-100 fill-black relative cursor-pointer block pb-[100%] mt-[50%]">
              <span className="inline-block h-0 w-0 overflow-hidden absolute"></span>
              <span className="bg-white rounded-[50%] border-[#EEEEEE] border-[1px] border-solid w-full h-full absolute top-0 right-0 left-0 bottom-0">
                <Heart className="absolute top-1/4 right-1/4 left-1/4 bottom-1/2 w-1/2 h-1/2 transition-opacity duration-200 ease" />
              </span>
            </button>
          </div>
        </div>
        <div
          className="z-500 min-w-[50%] max-w-[50%] 2xl:min-w-[35%] 2xl:max-w-[35%] small:sticky small:top-48 small:max-w-[300px] w-full px-16 py-10 gap-y-12"
          ref={infoRef}
        >
          {isOnboarding && <ProductOnboardingCta />}
          <ProductActions product={product} variantColor={variantColor!} />
        </div>
      </div>
      <div className="content-container my-16 px-6 small:px-8 small:my-32">
        <RelatedProducts product={product} />
      </div>
      <MobileActions product={product} show={!inView} />
    </ProductProvider>
  )
}

export default ProductTemplate
