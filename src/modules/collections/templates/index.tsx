"use client"

import usePreviews from "@lib/hooks/use-previews"
import { getProductsByCollectionHandle } from "@lib/data"
import getNumberOfSkeletons from "@lib/util/get-number-of-skeletons"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useCart } from "medusa-react"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { ProductCollection } from "@medusajs/medusa"
import AliceCarousel from "react-alice-carousel"
import { useSearchParams } from "next/navigation"
import { SizeDetailType, getSizesWithAvailability } from "@lib/util"

const CollectionTemplate: React.FC<{
  collection: ProductCollection
  collectionsList: ProductCollection[]
}> = ({ collection, collectionsList }) => {
  const brand = useSearchParams().get("brand")
  const { cart } = useCart()
  const { ref, inView } = useInView()
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

  useEffect(() => {
    if (cart?.region_id) {
      refetch()
    }
  }, [cart?.region_id, refetch])

  return (
    <>
      <div className="relative bg-secondary">
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
