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

type ProductActionsProps = {
  product: PricedProduct
  metalOptions: MetalOptionType
  defaultVariant: PricedVariant
  onVariantChange: (value: string) => void
}

const ProductActionsInner: React.FC<ProductActionsProps> = ({
  product,
  metalOptions,
  defaultVariant,
  onVariantChange,
}) => {
  const { updateOptions, addToCart, options, inStock, variant } =
    useProductActions()
  const price = useProductPrice({ id: product.id!, variantId: variant?.id })
  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price
    return variantPrice || cheapestPrice || null
  }, [price])
  const [metalOptionId, setMetalOptionId] = useState<string>("")
  const [caratOptionId, setCaratOptionId] = useState<string>("")
  const [diamondOptionId, setDiamondOptionId] = useState<string>("")
  const [caratOptions, setCaratOptions] =
    useState<(ProductOptionValue | undefined)[]>()
  const [diamondOptions, setDiamondOptions] =
    useState<(ProductOptionValue | undefined)[]>()

  useEffect(() => {
    setTimeout(() => {
      defaultVariant.options?.forEach((option) => {
        console.log(option.option_id)
        updateOptions({ [option.option_id]: option.value })
      })
    }, 2000)

    const options = product?.options
    const variants = product?.variants

    const metalOptionId =
      options?.filter((option) => option.title.toLowerCase() === "metal")[0]
        ?.id || ""
    setMetalOptionId(metalOptionId)

    const caratOptionId =
      options?.filter((option) => option.title.toLowerCase() === "carat")[0]
        ?.id || ""
    setCaratOptionId(caratOptionId)
    const caratOptions = variants
      .map((variant) =>
        variant?.options?.find((option) => option.option_id === caratOptionId)
      )
      .filter(Boolean)
    const uniqueCaratOptions = [
      ...new Set(caratOptions.map((option) => option?.value)),
    ].map((value) => caratOptions.find((option) => option?.value === value))
    setCaratOptions(uniqueCaratOptions)

    const diamondOptionId =
      options?.filter((option) => option.title.toLowerCase() === "diamonds")[0]
        ?.id || ""
    setDiamondOptionId(diamondOptionId)
    const diamondOptions = variants
      .map((variant) =>
        variant?.options?.find((option) => option.option_id === diamondOptionId)
      )
      .filter(Boolean)
    const uniqueDiamondOptions = [
      ...new Set(diamondOptions.map((option) => option?.value)),
    ].map((value) => diamondOptions.find((option) => option?.value === value))
    setDiamondOptions(uniqueDiamondOptions)
  }, [])

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
          {Object.entries(metalOptions).map(([key, item]) => {
            return (
              <label
                key={key}
                htmlFor={key}
                className="group relative flex items-center justify-center h-12 w-12 shadow-sm cursor-pointer bg-secondary"
              >
                <span className="p-2 z-[100]">
                  <img key={key} src={item.image} className="h-full w-full" />
                </span>

                <input
                  type="radio"
                  name="color-options"
                  id={key}
                  className="peer absolute h-0 w-0 appearance-none"
                  onChange={() => {
                    updateOptions({ [metalOptionId]: item.value })
                    onVariantChange(item.value!)
                  }}
                  defaultChecked={item?.variant_id === defaultVariant.id}
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
                    id={item?.id}
                    name="carat-options"
                    type="radio"
                    className="peer absolute h-0 w-0 appearance-none"
                    onChange={() =>
                      updateOptions({ [caratOptionId]: item?.value! })
                    }
                    defaultChecked={item?.variant_id === defaultVariant.id}
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
        {diamondOptions?.length && (
          <span className="text-base text-gray-500 mb-2">
            Select Your Diamond's Characteristics
          </span>
        )}
        <div className="flex flex-col gap-6">
          {diamondOptions?.length &&
            diamondOptions.map((item, index) => {
              const splitArray = item?.value.split("/")
              const diamondType = splitArray![0]
              const diamondDetail = splitArray![splitArray!.length - 1]
              return (
                <label
                  key={item?.id}
                  htmlFor={item?.id}
                  className="group relative flex items-center justify-between h-16 w-full shadow-sm cursor-pointer bg-secondary px-6"
                >
                  <div className="flex flex-col">
                    <div className="text-base z-[100]">{diamondType}</div>
                    <div className="text-sm z-[100]">{diamondDetail}</div>
                  </div>
                  {selectedPrice && (
                    <>
                      <div className="flex flex-col text-sm">
                        <div
                          className={clsx(
                            "mr-1 text-gray-500 whitespace-nowrap z-[100]",
                            {
                              "line-through":
                                selectedPrice.price_type === "sale",
                            }
                          )}
                        >
                          {selectedPrice.original_price}
                        </div>
                        {selectedPrice.price_type === "sale" && (
                          <div className={"mr-1 whitespace-nowrap z-[100]"}>
                            {selectedPrice.calculated_price}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  <input
                    id={item?.id}
                    name="diamond-options"
                    type="radio"
                    className="peer absolute h-0 w-0 appearance-none"
                    onChange={() =>
                      updateOptions({ [diamondOptionId]: item?.value! })
                    }
                    defaultChecked={item?.variant_id === defaultVariant.id}
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
