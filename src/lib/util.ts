import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { InfiniteProductPage } from "types/global"

export type SizeDetailType = {
  value: string
  canBuy: boolean
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSizesWithAvailability = (pages: InfiniteProductPage[]) => {
  if (!pages) {
    return []
  }
  const products: PricedProduct[] = []

  for (const page of pages) {
    products.push(...page.response.products)
  }

  let result: { [key: string]: SizeDetailType[] } = {}

  products.map((product) => {
    const productId = product.id
    if (productId) {
      const sizeId = product?.options?.find(
        (option) => option.title.toLowerCase() === "size"
      )
      const uniqueSizes: string[] = []
      const sizes: SizeDetailType[] = []
      product.variants.map((variant) => {
        const val = variant.options?.find(
          (option) => option.option_id === sizeId?.id
        )?.value
        if (val && !uniqueSizes.includes(val)) {
          uniqueSizes.push(val)
          if (
            (variant.inventory_quantity && variant.inventory_quantity > 0) ||
            variant.allow_backorder === true
          ) {
            sizes.push({ value: val, canBuy: true })
          } else {
            sizes.push({ value: val, canBuy: false })
          }
        } else {
          if (
            (variant.inventory_quantity && variant.inventory_quantity > 0) ||
            variant.allow_backorder === true
          ) {
            if (
              val &&
              sizes[uniqueSizes.findIndex((v) => (v = val))].canBuy === false
            ) {
              sizes[uniqueSizes.findIndex((v) => (v = val))].canBuy = true
            }
          }
        }
      })

      result[productId] = sizes
    }
  })

  return result
}
