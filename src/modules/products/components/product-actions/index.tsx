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
import { usePathname } from "next/navigation"
import { ProductOptionValue } from "@medusajs/medusa"
import { useCart, useCreateLineItem } from "medusa-react"
import { CART_KEY, useStore } from "@lib/context/store-context"

type ProductActionsProps = {
  product: PricedProduct
  variantColor: string
}

type ColorOptionsType = {
  [key: string]: string
}

const ProductActionsInner: React.FC<ProductActionsProps> = ({
  product,
  variantColor,
}) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()

  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price

    return variantPrice || cheapestPrice || null
  }, [price])

  const [colorOptionId, setColorOptionId] = useState<string>("")
  const [caratOptionId, setCaratOptionId] = useState<string>("")
  const [variants, setVariants] = useState<PricedVariant[]>()
  const [caratOptions, setCaratOptions] =
    useState<(ProductOptionValue | undefined)[]>()
  const [colorOptions, setColorOptions] = useState<ColorOptionsType>({})
  useEffect(() => {
    const variants = product?.variants
    setVariants(variants)

    const colorOptionId =
      product?.options?.filter(
        (option) => option.title.toLowerCase() === "color"
      )[0]?.id || ""
    setColorOptionId(colorOptionId)

    const colorValues = product?.variants
      .map((variant) =>
        variant?.options?.find((option) => option.option_id === colorOptionId)
      )
      .filter(Boolean)
    colorValues.map((option) => {
      colorOptions[option?.variant_id!] = option?.value!
    })

    const caratOptionId =
      product?.options?.filter(
        (option) => option.title.toLowerCase() === "carat"
      )[0]?.id || ""
    setCaratOptionId(caratOptionId)

    const caratOptions = product?.variants
      .map((variant) =>
        variant?.options?.find((option) => option.option_id === caratOptionId)
      )
      .filter(Boolean)
    const uniqueCaratOptions = [
      ...new Set(caratOptions.map((option) => option?.value)),
    ].map((value) => caratOptions.find((option) => option?.value === value))
    setCaratOptions(uniqueCaratOptions)

    setTimeout(() => {
      updateOptions({
        [caratOptionId]: uniqueCaratOptions && uniqueCaratOptions[0]?.value!,
        [colorOptionId]: "14K White Gold",
      })
    }, 1000)
  }, [])

  const updateCaratOption = (value: string) => {
    updateOptions({ [caratOptionId]: value })
  }

  const updateColorOption = (varinatId: string) => {
    const value = colorOptions && colorOptions[varinatId]
    if (value) {
      updateOptions({ [colorOptionId]: value })
    }
  }

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
          {variants?.length &&
            variants.map((item, index) => {
              return (
                item?.inventory_quantity &&
                item?.inventory_quantity > 0 && (
                  <label
                    key={item?.id}
                    htmlFor={item?.id}
                    className="group relative flex items-center justify-center h-12 w-12 shadow-sm cursor-pointer bg-secondary"
                  >
                    <span className="p-2 z-[100]">
                      <img
                        key={item.title + "" + index}
                        src={item?.thumbnail!}
                        className="h-full w-full"
                      />
                    </span>

                    <input
                      type="radio"
                      name="color-options"
                      id={item?.id}
                      value="growth"
                      className="peer absolute h-0 w-0 appearance-none"
                      onChange={() => updateColorOption(item?.id!)}
                    />
                    <span
                      aria-hidden="true"
                      className="hidden absolute inset-0 border-[1px] border-black bg-green-200 bg-opacity-10 peer-checked:block peer-checked:bg-white group-hover:block group-hover:bg-white"
                    ></span>
                  </label>
                )
              )
            })}
        </div>

        <div className="flex gap-x-6">
          {caratOptions?.length &&
            caratOptions.map((item, index) => {
              return (
                <label
                  key={item?.id}
                  htmlFor={item?.id}
                  className="group relative flex flex-col items-center justify-center h-12 w-12 shadow-sm cursor-pointer bg-secondary"
                >
                  <span className="font-normal text-black leading-tight uppercase z-[100]">
                    {item?.value}
                  </span>

                  <input
                    type="radio"
                    name="carat-options"
                    id={item?.id}
                    value="growth"
                    className="peer absolute h-0 w-0 appearance-none"
                    onChange={() => updateCaratOption(item?.value!)}
                  />
                  <span
                    aria-hidden="true"
                    className="hidden absolute inset-0 border-[1px] border-black bg-opacity-10 peer-checked:block peer-checked:bg-white group-hover:block group-hover:bg-white"
                  ></span>
                </label>
              )
            })}
        </div>

        <div className="mt-2">
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
  variantColor,
}) => (
  <ProductProvider product={product}>
    <ProductActionsInner product={product} variantColor={variantColor} />
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
