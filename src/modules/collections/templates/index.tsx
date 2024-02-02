"use client"

import usePreviews from "@lib/hooks/use-previews"
import {
  getProductCountByBrandByCollectionHandle,
  getProductsByCollectionHandle,
} from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ProductCollection } from "@medusajs/medusa"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Filter from "@modules/layout/components/filter"
import Divider from "@modules/common/components/divider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@modules/components/ui/accordion"
import { Checkbox } from "@modules/components/ui/checkbox"
import {
  BASE_URL,
  FILTER_CATEGORIES,
  GET_CATEGORIES_ITEMS_PER_SLIDE,
  CATEGORIES_RESPONSIVE,
  CATEGORIES,
} from "@lib/constants"
import AliceCarousel from "react-alice-carousel"
import { notFound, usePathname, useSearchParams } from "next/navigation"
import { SizeDetailType, getSizesWithAvailability } from "@lib/util"
import clsx from "clsx"

const CollectionTemplate: React.FC<{
  collection: ProductCollection
  collectionsList: ProductCollection[]
}> = ({ collection, collectionsList }) => {
  const brand = useSearchParams().get("brand")
  const { cart } = useCart()
  const { ref, inView } = useInView()
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<ReactNode[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const carouselRef = useRef<AliceCarousel>(null)
  const [isNextBtnVisisble, setNextButtonVisisble] = useState(true)
  const [isPrevBtnVisisble, setPrevButtonVisisble] = useState(false)
  const {
    data: infiniteData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    [`get_collection_products`, collection?.handle, cart?.id],
    ({ pageParam }) =>
      getProductsByCollectionHandle({
        pageParam,
        handle: collection.handle!,
        cartId: cart?.id,
        currencyCode: cart?.region.currency_code,
        categories: [brand ?? ""],
      }),
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  )

  const previews = usePreviews({
    pages: infiniteData?.pages,
    region: cart?.region,
  })

  const sizes = getSizesWithAvailability(infiniteData?.pages || []) as {
    [key: string]: SizeDetailType[]
  }

  const handleFilterOverlay = (data: string) => {
    if (data === "FilterOverlay") {
      setIsOpen(!isOpen)
    }
  }

  const handlePrevButtonClick = () => {
    const itemsPerSlide = GET_CATEGORIES_ITEMS_PER_SLIDE
    if (carouselRef.current) {
      if (currentIndex - itemsPerSlide > 0) {
        carouselRef.current.slideTo(currentIndex - itemsPerSlide)
        setCurrentIndex(currentIndex - itemsPerSlide)
        setNextButtonVisisble(true)
        setPrevButtonVisisble(true)
      } else if (currentIndex - itemsPerSlide <= 0) {
        carouselRef.current.slideTo(0)
        setCurrentIndex(0)
        setNextButtonVisisble(true)
        setPrevButtonVisisble(false)
      }
    }
  }

  const handleNextButtonClick = () => {
    const itemsPerSlide = GET_CATEGORIES_ITEMS_PER_SLIDE
    const index = currentIndex + itemsPerSlide
    const totalItems = items.length
    setCurrentIndex(index)
    if (carouselRef.current) {
      if (itemsPerSlide + index < totalItems) {
        setNextButtonVisisble(true)
        setPrevButtonVisisble(true)
      } else if (itemsPerSlide + index > totalItems) {
        setNextButtonVisisble(false)
        setPrevButtonVisisble(true)
      } else if (itemsPerSlide + index === totalItems) {
        setNextButtonVisisble(false)
        setPrevButtonVisisble(true)
      }
      carouselRef.current.slideTo(
        index + itemsPerSlide < totalItems
          ? currentIndex + itemsPerSlide
          : totalItems - itemsPerSlide
      )
    }
  }

  const handleSlideChanged = (e: { item: number }) => {
    setCurrentIndex(e.item)
  }

  useEffect(() => {
    if (cart?.region_id) {
      refetch()
    }
  }, [cart?.region_id, refetch])

  useEffect(() => {
    // if (collectionsList) {
    //   console.log(collection.metadata)
    //   var categories: ProductCollection[] = []
    //   if (collection.metadata.parent) {
    //     categories = collectionsList.filter(
    //       (c) => c.metadata.parent === collection.metadata.parent
    //     )
    //   } else if (collection.metadata.name) {
    //     categories = collectionsList.filter(
    //       (c) => c.metadata.parent === collection.metadata.name
    //     )
    //   } else {
    //     notFound()
    //   }
    //   console.log({ categories })
    //   // if it's parent collection then redirect to first category
    //   if (!collection.metadata.parent) {
    //     const category = categories[0]
    //     if (!category) {
    //       notFound()
    //     }
    //     window.location.href = `${BASE_URL}/collections/${category.handle}`
    //   }
    //   const categoryItems = categories.map((item, index) => {
    //     const title = item.title.toLowerCase()
    //     return (
    //       <a
    //         key={index + "-" + item.title}
    //         className="rounded-full flex flex-col items-center text-center"
    //         href={`${BASE_URL}/collections/${item?.handle}`}
    //       >
    //         <div
    //           className={clsx(
    //             "relative flex items-center justify-center border-[1px]  bg-white text-gray-800 w-20 h-20 rounded-full",
    //             {
    //               "border-[#E6E6E6]": item.handle !== collection.handle,
    //               "border-black": item.handle === collection.handle,
    //             }
    //           )}
    //         >
    //           <img
    //             src={`${CATEGORIES[title]?.image}`}
    //             className="w-11 h-16 rounded-full"
    //             alt={item?.title}
    //           ></img>
    //         </div>
    //         <div className="text-sm overflow-hidden mt-[15px]">
    //           {item?.title}
    //         </div>
    //       </a>
    //     )
    //   })
    //   setItems(categoryItems)
    //   if (categoryItems.length <= GET_CATEGORIES_ITEMS_PER_SLIDE) {
    //     setNextButtonVisisble(false)
    //     setPrevButtonVisisble(false)
    //   } else {
    //     setNextButtonVisisble(true)
    //     setPrevButtonVisisble(false)
    //   }
    // }
  }, [])

  return (
    <>
      <div className="relative bg-secondary">
        {/* Products Filter  */}
        <div className="content-container p-6">
          <div className="mb-8 text-[38px] font-extrabold text-center uppercase">
            <h1>{collection.title}</h1>
          </div>
          <ul className="grid grid-cols-2 large:grid-cols-3 2xl:grid-cols-4 gap-x-6 gap-y-8">
            {previews.map((p) => (
              <li key={p.id}>
                <ProductPreview {...p} sizes={sizes[p.id]} />
              </li>
            ))}
            {isFetchingNextPage &&
              repeat(getNumberOfSkeletons(infiniteData?.pages)).map((index) => (
                <li key={index}>
                  <SkeletonProductPreview />
                </li>
              ))}
          </ul>
          <div
            className="py-16 flex justify-center items-center text-small-regular text-gray-700"
            ref={ref}
          >
            <span ref={ref}></span>
          </div>
        </div>
        {/* Products Filter  */}
      </div>
    </>
  )
}

export default CollectionTemplate

{
  /* <div className="flex justify-center items-center 2xl:max-w-[1200px] xlarge:max-w-[960px] large:max-w-[720px] max-w-[600px] overflow-hidden mx-auto text-center p-6">
          <AliceCarousel
            mouseTracking
            items={items}
            animationDuration={1000}
            disableDotsControls={true}
            responsive={CATEGORIES_RESPONSIVE}
            controlsStrategy="alternate"
            ref={carouselRef}
            onSlideChanged={handleSlideChanged}
            renderPrevButton={() => (
              <button
                onClick={handlePrevButtonClick}
                className={clsx(
                  "category-carousel-btn alice-carousel__prev-btn -left-6",
                  {
                    "opacity-100 transition-opacity duration-1000 ease-in":
                      isPrevBtnVisisble,
                    "opacity-0 transition-opacity duration-1000 ease-in":
                      !isPrevBtnVisisble,
                  }
                )}
              >
                <ChevronLeft
                  className={clsx("", {
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
                  "category-carousel-btn alice-carousel__next-btn right-0",
                  {
                    "opacity-100 transition-opacity duration-1000 ease-in":
                      isNextBtnVisisble,
                    "opacity-0 transition-opacity duration-1000 ease-in":
                      !isNextBtnVisisble,
                  }
                )}
              >
                <ChevronRight
                  className={clsx("", {
                    visible: isNextBtnVisisble,
                    hidden: !isNextBtnVisisble,
                  })}
                />
              </button>
            )}
          />
        </div> */
}
