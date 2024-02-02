import clsx from "clsx"
import Link from "next/link"
import { ProductPreviewType } from "types/global"
import Thumbnail from "../thumbnail"
import { Text } from "@medusajs/ui"
import { SizeDetailType } from "@lib/util"
import { Heart } from "lucide-react"

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  hoverImage,
  price,
  isFeatured,
  sizes,
}: ProductPreviewType & { sizes: SizeDetailType[] }) => {
  const handleHeartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    console.log("Heart clicked!")
  }

  return (
    <div className="relative">
      <Link href={`/products/${handle}`} className="group">
        <Thumbnail
          thumbnail={thumbnail}
          size="full"
          isFeatured={isFeatured}
          sizes={sizes}
          hoverImage={hoverImage}
        />
      </Link>
      <div className="flex flex-col mt-4 justify-between">
        <Text className="text-xs xlarge:text-sm uppercase text-left font-bold mb-0.5 truncate whitespace-nowrap d-block">
          {title}
        </Text>
        <div className="flex items-center gap-x-2 pt-2 mb-1.5">
          {price ? (
            <>
              <Text
                className={clsx(
                  "text-black whitespace-nowrap text-sm xlarge:text-lg leading-5 font-bold",
                  {
                    "line-through": price.price_type === "sale",
                  }
                )}
              >
                {price.original_price}
              </Text>
              {price.price_type === "sale" && (
                <Text className="whitespace-nowrap text-sm xlarge:text-lg leading-5 font-bold text-red">
                  {price.calculated_price}
                </Text>
              )}
            </>
          ) : (
            <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
          )}
        </div>
      </div>
      <div className="absolute w-full min-w-[44px] max-w-[44px] block top-0 right-0 h-auto mr-5 mt-5">
        <button
          className="h-auto w-full z-100 fill-black relative cursor-pointer block pb-[100%]"
          onClick={handleHeartClick}
        >
          <span className="inline-block h-0 w-0 overflow-hidden absolute"></span>
          <span className="bg-white rounded-[50%] border-[#EEEEEE] border-[0.5px] border-solid w-full h-full absolute top-0 right-0 left-0 bottom-0">
            <Heart className="absolute top-1/4 right-1/4 left-1/4 bottom-1/4 w-1/2 h-1/2 opacity-1 transition-opacity duration-200 ease" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default ProductPreview
