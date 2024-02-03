import { Cart, Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { formatAmount, useProducts } from "medusa-react"
import { CalculatedVariant } from "types/medusa"

export function getProductOptions({
  optionTitle,
  product,
}: {
  optionTitle: string
  product: PricedProduct
}) {
  const productOptions = product?.options
  const productVariants = product?.variants

  const optionId =
    productOptions?.filter(
      (option) => option.title.toLowerCase() === optionTitle
    )[0]?.id || ""
  const options = productVariants
    .map((variant) =>
      variant?.options?.find((option) => option.option_id === optionId)
    )
    .filter(Boolean)
  const uniqueOptions = [
    ...new Set(options.map((option) => option?.value)),
  ].map((value) => options.find((option) => option?.value === value))

  return {
    optionId,
    options,
    uniqueOptions,
  }
}
