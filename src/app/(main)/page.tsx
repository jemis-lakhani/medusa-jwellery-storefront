import ArrowRight from "@modules/common/icons/arrow-right"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home() {
  return (
    <>
      <div className="relative">
        <div className="relative max-w-screen mx-auto bg-cover bg-center">
          <img
            src="/HPBanner.jpg"
            alt="Your Image Description"
            className="w-full h-auto bg-cover bg-center"
          />
        </div>
        <div className="absolute top-0 bottom-0 flex justify-center w-full">
          <div className="pl-[270px] text-left flex justify-start w-full">
            <div className="flex items-center w-[60%]">
              <div className="w-full d-block">
                <h1 className="uppercase text-7xl mb-2">
                  <span
                    style={{ color: "#ffb59c !important" }}
                    className="font-bold text-[#ffb59c !important]"
                  >
                    SALE
                  </span>
                </h1>
                <div className="text-2xl leading-6 mb-0.5 uppercase font-extrabold">
                  up to 50% off on winter styles
                </div>
                <button className="group relative flex items-center group-hover:transition-all bg-black font-bold text-white py-[7px] pl-[24px] border-0 mt-16">
                  <span className="uppercase tracking-normal text-2xl leading-8 flex items-center group-hover:transition-all delay-75 translate-x-0 group-hover:translate-x-[-13px]">
                    shop now
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 group-hover:transition-all delay-75 text-black pt-1 pr-1">
                    <ArrowRight size={20} strokeWidth={3} />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8"></div>
    </>
  )
}
