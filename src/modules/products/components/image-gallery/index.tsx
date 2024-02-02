import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <>
      <div className="relative">
        <div className="grid grid-cols-1 2xl:grid-cols-2">
          {images.map((image, index) => {
            return (
              <Container
                key={image.id}
                className="relative rounded-none aspect-[1200/1818] w-full overflow-hidden bg-ui-bg-subtle"
                id={image.id}
              >
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 w-full h-auto aspect-ratio-1200-1818"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Container>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ImageGallery
