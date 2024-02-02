import { SizeDetailType } from "@lib/util"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import PlaceholderImage from "@modules/common/icons/placeholder-image"
import clsx from "clsx"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { CSSProperties, useState } from "react"

type ThumbnailProps = {
  thumbnail?: string | null
  images?: MedusaImage[] | null
  hoverImage?: string | null
  size?: "small" | "medium" | "large" | "full" | "square"
  isFeatured?: boolean
  className?: string
  sizes?: SizeDetailType[]
}

const overlay: CSSProperties = {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  background: "rgba(249, 249, 249, 0.9)",
  color: "black",
  overflow: "hidden",
  width: "100%",
  transform: "translateY(100%)",
  transition: "transform 300ms",
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  thumbnail,
  hoverImage,
  images,
  size = "small",
  isFeatured,
  className,
  sizes,
}) => {
  const initialImage = thumbnail || images?.[0]?.url
  return (
    <Container
      className={clsx(
        "relative w-full overflow-hidden p-4 bg-ui-bg-subtle shadow-elevation-card-rest rounded-none group-hover:shadow-elevation-card-hover transition-shadow ease-in-out duration-150",
        className,
        {
          "aspect-[11/14]": isFeatured,
          "aspect-[9/16]": !isFeatured && size !== "square",
          "aspect-[1/1]": size === "square",
          "w-[180px]": size === "small",
          "w-[290px]": size === "medium",
          "w-[440px]": size === "large",
          "w-full": size === "full",
        }
      )}
    >
      <ImageOrPlaceholder
        image={initialImage}
        hoverImage={hoverImage}
        size={size}
        sizes={sizes}
      />
    </Container>
  )
}

const ImageOrPlaceholder = ({
  image,
  size,
  sizes,
  className,
  hoverImage,
}: Pick<ThumbnailProps, "size"> & {
  image?: string
  hoverImage?: string | null
  sizes?: SizeDetailType[]
  className?: string
}) => {
  const [isHovering, setIsHovering] = useState(false)
  return image ? (
    <>
      <Image
        src={`${isHovering && hoverImage ? hoverImage : image}`}
        alt="Thumbnail"
        className={clsx(
          "absolute inset-0 object-cover object-center",
          className
        )}
        draggable={false}
        quality={50}
        sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
        fill
        onMouseEnter={() => setIsHovering(true)}
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
      />
      <div
        onMouseOver={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(false)}
        style={{
          ...overlay,
          ...(isHovering ? { transform: "translateY(0%)" } : {}),
        }}
      >
        <div className="flex flex-col p-6">
          <div>
            <span className="font-bold">Quick Shop</span>
            <span> (Select your size)</span>
          </div>
          <div className="flex flex-wrap wrap gap-y-4 gap-x-10 mt-1">
            {sizes &&
              sizes
                .sort((a, b) =>
                  a.value.localeCompare(b.value, undefined, { numeric: true })
                )
                .map((size) => (
                  <Link
                    href={"/"}
                    style={
                      !size.canBuy
                        ? {
                            pointerEvents: "none",
                            userSelect: "none",
                            color: "gray",
                            cursor: "default",
                          }
                        : {}
                    }
                    className=""
                  >
                    <p>{size.value}</p>
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="w-full h-full absolute inset-0 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  )
}

export default Thumbnail
