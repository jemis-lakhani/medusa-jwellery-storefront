import {
  ProductProvider,
  useProductActions,
} from "@lib/context/product-context"
import useProductPrice from "@lib/hooks/use-product-price"
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing"
import { Button } from "@modules/components/ui/button"
import clsx from "clsx"
import React, { useEffect, useMemo, useState } from "react"
import { ProductOptionValue } from "@medusajs/medusa"
import { MetalOptionType } from "@modules/products/templates"
import { getProductOptions } from "@lib/data/product"
import { formatAmount, useCart } from "medusa-react"

type ProductActionsProps = {
  product: PricedProduct
  metalOptions: MetalOptionType
  defaultVariant: PricedVariant
  onVariantChange: (value: string) => void
}

type VariantPriceType = {
  [key: string]: {
    value?: string | null
    diamondType?: string | null
    diamondDetail?: string | null
    original_price: string | null
    original_price_incl_tax?: string | null
    original_tax?: string | null
    calculated_price?: string | null
    calculated_price_incl_tax?: string | null
    calculated_price_type?: string | undefined | null
    calculated_tax?: string | null
  }
}

const ProductActionsInner: React.FC<ProductActionsProps> = ({
  product,
  metalOptions,
  defaultVariant,
  onVariantChange,
}) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()
  var pricedProduct: PricedProduct | null = null
  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice, product } = price
    pricedProduct = product!

    return variantPrice || cheapestPrice || null
  }, [price])

  const { cart } = useCart()
  const [metalOptionId, setMetalOptionId] = useState<string>("")
  const [caratOptionId, setCaratOptionId] = useState<string>("")
  const [diamondOptionId, setDiamondOptionId] = useState<string>("")
  const [caratOptions, setCaratOptions] =
    useState<(ProductOptionValue | undefined)[]>()
  const [diamondOptions, setDiamondOptions] =
    useState<(ProductOptionValue | undefined)[]>()
  const [filteredDiamondOptions, setFilteredDiamondOptions] =
    useState<(ProductOptionValue | undefined)[]>()
  const [variantPrices, setVariantPrices] = useState<VariantPriceType>({})
  const [caratValue, setCaratValue] = useState("")
  const [metalValue, setMetalValue] = useState("")
  const [diamondValue, setDiamondValue] = useState("")

  useEffect(() => {
    const options = product?.options
    const metalOptionId =
      options?.filter((option) => option.title.toLowerCase() === "metal")[0]
        ?.id || ""
    setMetalOptionId(metalOptionId)

    const { optionId: caratOptionId, uniqueOptions: caratOptions } =
      getProductOptions({
        optionTitle: "carat",
        product,
      })
    setCaratOptionId(caratOptionId)
    setCaratOptions(caratOptions)

    const { optionId: diamondOptionId, options: diamondOptions } =
      getProductOptions({
        optionTitle: "diamonds",
        product,
      })
    setDiamondOptionId(diamondOptionId)
    setDiamondOptions(diamondOptions)

    defaultVariant.options?.forEach((option) => {
      if (option.option_id === caratOptionId) {
        updateOptions({ [caratOptionId]: option.value })
        setCaratValue(option.value)
      } else if (option.option_id === metalOptionId) {
        setMetalValue(option.value)
        updateOptions({ [metalOptionId]: option.value })
      } else if (option.option_id === diamondOptionId) {
        setDiamondValue(option.value)
        updateOptions({ [diamondOptionId]: option.value })
      }
    })
  }, [])

  console.log({ options })

  useEffect(() => {
    var diamondVariants: string[] = []
    product.variants.map((variant) => {
      var isCaratValueMatched = false
      var matchedVariant = false
      variant.options?.map((option) => {
        if (option.value === caratValue) {
          isCaratValueMatched = true
        }
        if (option.value === metalValue && isCaratValueMatched) {
          matchedVariant = true
          isCaratValueMatched = false
        }
        if (matchedVariant) {
          diamondVariants = [...diamondVariants, variant?.id!]
        }
      })
    })

    const options = diamondOptions?.filter((option) =>
      diamondVariants.includes(option?.variant_id!)
    )
    setFilteredDiamondOptions(options)
  }, [caratValue, metalValue, diamondOptions])

  useEffect(() => {
    const variantPrices: VariantPriceType = {}
    pricedProduct?.variants?.map((variant) => {
      variantPrices[variant?.id!] = {
        original_price: formatAmount({
          amount: variant.original_price!,
          region: cart?.region!,
          includeTaxes: false,
        }),
        original_price_incl_tax: formatAmount({
          amount: variant.original_price_incl_tax!,
          region: cart?.region!,
          includeTaxes: false,
        }),
        original_tax: formatAmount({
          amount: variant.original_tax!,
          region: cart?.region!,
          includeTaxes: false,
        }),
        calculated_price: formatAmount({
          amount: variant.calculated_price!,
          region: cart?.region!,
          includeTaxes: false,
        }),
        calculated_price_incl_tax: formatAmount({
          amount: variant.calculated_price_incl_tax!,
          region: cart?.region!,
          includeTaxes: false,
        }),
        calculated_price_type: variant.calculated_price_type,
        calculated_tax: formatAmount({
          amount: variant.calculated_tax!,
          region: cart?.region!,
          includeTaxes: false,
        }),
      }
    })
    setVariantPrices(variantPrices)
  }, [pricedProduct])

  return (
    <>
      <header className="flex flex-col gap-6">
        <h1 className="text-4xl leading-10 uppercase">{product?.title}</h1>
        {selectedPrice && (
          <>
            <div className="flex text-ui-fg-base">
              <div
                className={clsx(
                  "mr-1 text-gray-500 whitespace-nowrap text-xl leading-5",
                  {
                    "line-through": selectedPrice.price_type === "sale",
                  }
                )}
              >
                {selectedPrice.original_price}
              </div>
              {selectedPrice.price_type === "sale" && (
                <div className={"mr-1 whitespace-nowrap text-xl leading-5"}>
                  {selectedPrice.calculated_price}
                </div>
              )}
            </div>
          </>
        )}
      </header>

      <div className="flex flex-col gap-6 mt-10">
        <div className="flex gap-x-6">
          {Object.entries(metalOptions).map(([key, option]) => {
            return (
              <label
                key={key}
                htmlFor={key}
                className="group relative flex items-center justify-center h-12 w-12 shadow-sm cursor-pointer bg-secondary"
              >
                <span className="p-2 z-[100]">
                  <img key={key} src={option.image} className="h-full w-full" />
                </span>

                <input
                  type="radio"
                  name="color-options"
                  id={key}
                  className="peer absolute h-0 w-0 appearance-none"
                  onChange={() => {
                    updateOptions({ [metalOptionId]: option.value })
                    onVariantChange(option.value)
                    setMetalValue(option.value)
                  }}
                  defaultChecked={option?.variant_id === defaultVariant.id}
                />
                <span
                  aria-hidden="true"
                  className="hidden absolute inset-0 border-[1px] border-black bg-green-200 bg-opacity-10 peer-checked:block peer-checked:bg-white group-hover:block group-hover:bg-white"
                ></span>
              </label>
            )
          })}
        </div>

        <div className="flex gap-x-6">
          {caratOptions?.length &&
            caratOptions.map((option) => {
              return (
                <label
                  key={option?.id}
                  htmlFor={option?.id}
                  className="group relative flex flex-col items-center justify-center h-12 w-12 shadow-sm cursor-pointer bg-secondary"
                >
                  <span className="font-normal text-black leading-tight uppercase z-[100]">
                    {option?.value}
                  </span>

                  <input
                    id={option?.id}
                    name="carat-options"
                    type="radio"
                    className="peer absolute h-0 w-0 appearance-none"
                    onChange={() => {
                      updateOptions({ [caratOptionId]: option?.value! })
                      setCaratValue(option?.value!)
                    }}
                    defaultChecked={option?.variant_id === defaultVariant.id}
                  />
                  <span
                    aria-hidden="true"
                    className="hidden absolute inset-0 border-[1px] border-black bg-opacity-10 peer-checked:block peer-checked:bg-white group-hover:block group-hover:bg-white"
                  ></span>
                </label>
              )
            })}
        </div>
      </div>

      <div className="flex flex-col mt-10">
        {filteredDiamondOptions?.length && (
          <span className="text-base text-gray-500 mb-2">
            Select Your Diamond's Characteristics
          </span>
        )}
        <div className="flex flex-col gap-6">
          {filteredDiamondOptions?.length &&
            filteredDiamondOptions.map((option) => {
              const splitArray = option?.value.split("/")
              const diamondType = splitArray![0]
              const diamondDetail = splitArray![splitArray!.length - 1]
              const variant = variantPrices[option?.variant_id!]

              return (
                <label
                  key={option?.id}
                  htmlFor={option?.id}
                  className="group relative flex items-center justify-between h-16 w-full shadow-sm cursor-pointer bg-secondary px-6"
                >
                  <div className="flex flex-col">
                    <div className="text-base z-[100]">{diamondType}</div>
                    <div className="text-sm z-[100]">{diamondDetail}</div>
                  </div>

                  <div className="flex flex-col text-sm">
                    <div
                      className={clsx(
                        "mr-1 text-gray-500 whitespace-nowrap z-[100]",
                        {
                          "line-through":
                            variant?.calculated_price_type === "sale",
                        }
                      )}
                    >
                      {variant?.original_price}
                    </div>
                    {variant?.calculated_price_type === "sale" && (
                      <div className={"mr-1 whitespace-nowrap z-[100]"}>
                        {variant?.calculated_price}
                      </div>
                    )}
                  </div>

                  <input
                    id={option?.id}
                    name="diamond-options"
                    type="radio"
                    className="peer absolute h-0 w-0 appearance-none"
                    onChange={() => {
                      updateOptions({
                        [diamondOptionId]: option?.value!,
                      })
                      setDiamondValue(option?.value!)
                    }}
                    defaultChecked={option?.value === diamondValue}
                  />
                  <span
                    aria-hidden="true"
                    className="hidden absolute inset-0 border-[1px] border-black bg-opacity-10 peer-checked:block peer-checked:bg-white group-hover:block group-hover:bg-white"
                  ></span>
                </label>
              )
            })}
        </div>

        <div className="mt-6">
          <div className="flex flex-col gap-6 overflow-hidden">
            {/* Add to cart button */}
            <Button
              onClick={addToCart}
              disabled={!inStock || !variant}
              className="w-full py-3.5 px-7 text-base leading-5 font-bold h-full uppercase"
              variant={"default"}
            >
              {!inStock
                ? "Out of stock"
                : !variant
                ? "Select variant"
                : "Add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

const ProductActions: React.FC<ProductActionsProps> = ({
  product,
  metalOptions,
  defaultVariant,
  onVariantChange,
}) => (
  <ProductProvider product={product}>
    <ProductActionsInner
      product={product}
      metalOptions={metalOptions}
      defaultVariant={defaultVariant}
      onVariantChange={onVariantChange}
    />
  </ProductProvider>
)

export default ProductActions

{
  /* <div
            className={`flex justify-center items-center ${
              isNextBtnVisisble || isPrevBtnVisisble
                ? "max-w-[85%] large:max-w-[87%] mx-auto"
                : "max-w-auto"
            }`}
          >
            <AliceCarousel
              mouseTracking
              items={variants}
              animationDuration={1000}
              disableDotsControls={true}
              controlsStrategy="alternate"
              responsive={VARIANTS_RESPONSIVE}
              ref={carouselRef}
              onSlideChanged={handleSlideChanged}
              renderPrevButton={() => (
                <button
                  onClick={handlePrevButtonClick}
                  className={clsx(
                    "alice-carousel__prev-btn variants-carousel-btn -left-6",
                    {
                      "opacity-100 transition-opacity duration-800 ease-in":
                        isPrevBtnVisisble,
                      "opacity-0 transition-opacity duration-700 ease-in hidden":
                        !isPrevBtnVisisble,
                    }
                  )}
                >
                  <ChevronLeft
                    className={clsx("carousel-icon", {
                      visible: isPrevBtnVisisble,
                      hidden: !isPrevBtnVisisble,
                    })}
                  />
                </button>
              )}
              renderNextButton={() => (
                <button
                  onClick={handleNextButtonClick}
                  className={clsx(
                    "alice-carousel__next-btn variants-carousel-btn right-0",
                    {
                      "opacity-100 transition-opacity duration-800 ease-in":
                        isNextBtnVisisble,
                      "opacity-0 transition-opacity duration-700 ease-in hidden":
                        !isNextBtnVisisble,
                    }
                  )}
                >
                  <ChevronRight
                    className={clsx("carousel-icon", {
                      visible: isNextBtnVisisble,
                      hidden: !isNextBtnVisisble,
                    })}
                  />
                </button>
              )}
            />
          </div> */
}

{
  /* <div className="relative overflow-hidden">
          <Accordion type="multiple" className="w-full">
            {product?.description && product?.description?.length && (
              <AccordionItem value="item-1">
                <AccordionTrigger>Details</AccordionTrigger>
                <AccordionContent>{product?.description}</AccordionContent>
                {product?.tags && (
                  <AccordionContent>
                    {product?.tags.map((tag, index) => (
                      <li key={index}>{tag.value}</li>
                    ))}
                  </AccordionContent>
                )}
              </AccordionItem>
            )}
            {product?.material && (
              <AccordionItem value="item-2">
                <AccordionTrigger>Material</AccordionTrigger>
                <AccordionContent>{product?.material}</AccordionContent>
              </AccordionItem>
            )}
          </Accordion> */
}

{
  /* <div className="flex flex-wrap gap-2">
              {selectedPrice?.price_type === "sale" && (
                <div className="bg-black whitespace-nowrap text-white text-sm leading-5 font-bold rounded-none uppercase py-1.5 px-3">
                  SALE -{selectedPrice.percentage_diff}%
                </div>
              )}
              {product.categories?.length! > 0 &&
                product.categories?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-black whitespace-nowrap text-white text-sm leading-5 font-bold rounded-none uppercase py-1.5 px-3"
                  >
                    {item?.name}
                  </div>
                ))}
            </div> */
}

// const defaultV = product?.options?.map((option, index) => {
//   var optionId = ""
//   const optionValue = product?.variants[index]?.options?.find(
//     (opt) => opt.option_id === option.id
//   )?.value
//   if (optionValue) {
//     optionId = option.id
//   }
// })
