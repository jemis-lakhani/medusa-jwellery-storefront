"use client"

import { useCollections, useProductCategories } from "medusa-react"
import { Text } from "@medusajs/ui"
import Link from "next/link"
import MedusaCTA from "../medusa-cta"
import {
  ChevronRight,
  Facebook,
  Instagram,
  MoveRight,
  Twitter,
  Youtube,
} from "lucide-react"
import { useEffect, useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@modules/components/ui/accordion"

const FooterNav = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" && window.innerWidth <= 751
  )
  const [country, setCountry] = useState("भारत")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 750)
      }

      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return (
    <div>
      <div className="flex xl:items-center justify-center min-w-full flex-wrap bg-[#f6f6f6] pb-10">
        {!isSmallScreen && (
          <div className="flex space-x-4 xl:w-[36%] lg:mr-auto lg:w-[50%] md:w-[60%] md:mr-auto sm:w-[80%] sm:mr-auto p-14 pb-0 h-full h-[591px]">
            <div className="flex flex-col w-1/2">
              <div className="text-2xl min-h-[78px] font-bold">
                HUGO BOSS EXPERIENCE
              </div>
              <div>
                <img src="/footerImages/footer-1.webp" alt="" />
              </div>
              <div className="font-extralight pt-4 pr-4 pb-4">
                Join our HUGO BOSS EXPERIENCE community to receive exclusive
                benefits such as Members' Only promotions, invitations to
                events, access to exclusive products and much more. Sign up
                today and enjoy a variety of benefits, from exclusive gifts to
                VIP prizes!
              </div>
              <div className="flex mt-auto text-sm font-bold group relative">
                <span className="absolute left-0 transition-transform duration-300 group-hover:translate-x-4">
                  <ChevronRight size={20} strokeWidth={1.5} />
                </span>
                <span className="ml-8">DISCOVER MORE</span>
              </div>
            </div>
            <div className="flex flex-col w-1/2">
              <div className="text-2xl min-h-[78px] font-bold">
                A NEW PODCAST
              </div>
              <div>
                <img src="/footerImages/footer-2.webp" alt="" />
              </div>
              <div className="font-extralight pt-4 pr-4 pb-4">
                Journey into the lives of inspiring people in a new podcast:
                Behind the BOSS. Listen to the latest episode featuring Jordan
                Barrett - available on all free podcast platforms.
              </div>
              <div className="flex mt-auto text-sm font-bold group relative">
                <span className="absolute left-0 transition-transform duration-300 group-hover:translate-x-4">
                  <ChevronRight size={20} strokeWidth={1.5} />
                </span>
                <span className="ml-8">DISCOVER MORE</span>
              </div>
            </div>
          </div>
        )}
        {!isSmallScreen && (
          <div className="flex space-x-4 xl:w-[54%] lg:w-[70%] lg:mr-auto md:mr-auto md:w-[80%] p-14 pb-0 h-[591px]">
            <div className="flex flex-col max-w-[15rem] w-1/2 h-full">
              <div className="text-2xl min-h-[78px] font-bold">CONTACT</div>
              <div className="text-base max-w-[10rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                LIVE CHAT & STYLE ADVICE
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Customer Care
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Whatsapp**
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Email Us
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Store Locator
              </div>
              <div className="flex mt-auto text-sm font-bold group relative">
                <span className="absolute left-0 transition-transform duration-300 group-hover:translate-x-4">
                  <ChevronRight size={20} strokeWidth={1.5} />
                </span>
                <span className="ml-8">HELP & CONTACT</span>
              </div>
            </div>
            <div className="flex flex-col max-w-[15rem] w-1/2">
              <div className="text-2xl min-h-[78px] font-bold">SERVICES</div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Christmas FAQ
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Delivery
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                How to Return
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Return Portal
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                BOLD FOR THE PLANET
              </div>
              <div className="flex flex-row flex-wrap mb-[16px] mr-[24px]">
                <div className="mr-4">
                  <img
                    src="/footerImages/visa.png"
                    height={40}
                    width={40}
                    alt=""
                  />
                </div>
                <div className="mr-4">
                  <img
                    src="/footerImages/mastercard.png"
                    height={40}
                    width={40}
                    alt=""
                  />
                </div>
                <div className="mr-4">
                  <img
                    src="/footerImages/americanexpress.png"
                    height={40}
                    width={40}
                    alt=""
                  />
                </div>
                <div className="mr-4">
                  <img
                    src="/footerImages/paypal.png"
                    height={40}
                    width={40}
                    alt=""
                  />
                </div>
                <div className="mr-4">
                  <img
                    src="/footerImages/dinersclub.png"
                    height={40}
                    width={40}
                    alt=""
                  />
                </div>
              </div>
              <div className="flex mt-auto text-sm font-bold group relative">
                <span className="absolute left-0 transition-transform duration-300 group-hover:translate-x-4">
                  <ChevronRight size={20} strokeWidth={1.5} />
                </span>
                <span className="ml-8">FAQ</span>
              </div>
            </div>
            <div className="flex flex-col max-w-[15rem] w-1/2">
              <div className="text-2xl min-h-[78px] font-bold">OUR COMPANY</div>

              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Careers
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Investor Relations
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Sustainability
              </div>
              <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                Press
              </div>
              <div className="flex mt-auto text-sm font-bold group relative">
                <span className="absolute left-0 transition-transform duration-300 group-hover:translate-x-4">
                  <ChevronRight size={20} strokeWidth={1.5} />
                </span>
                <span className="ml-8">CORPORATE WEBSITE</span>
              </div>
            </div>
          </div>
        )}

        {isSmallScreen && (
          <div className="w-full bg-[#f6f6f6]">
            <Accordion type="multiple">
              <AccordionItem value="item-1" className="pl-4">
                <AccordionTrigger>HUGO BOSS EXPERIENCE</AccordionTrigger>
                <AccordionContent>
                  <div className="flex">
                    <div className="w-[48%]">
                      <img src="/footerImages/footer-1.webp" alt="" />
                    </div>
                    <div className="font-extralight w-[48%] p-4 ">
                      Join our HUGO BOSS EXPERIENCE community to receive
                      exclusive benefits such as Members' Only promotions,
                      invitations to events, access to exclusive products and
                      much more. Sign up today and enjoy a variety of benefits,
                      from exclusive gifts to VIP prizes!
                    </div>
                  </div>
                  <div className="flex ml-8 mt-4 text-sm font-bold">
                    <span className="">
                      <ChevronRight size={20} strokeWidth={1.5} />
                    </span>
                    <span className="ml-4">DISCOVER MORE</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="pl-4">
                <AccordionTrigger>A NEW PODCAST</AccordionTrigger>
                <AccordionContent>
                  <div className="flex">
                    <div className="w-[48%]">
                      <img src="/footerImages/footer-2.webp" alt="" />
                    </div>
                    <div className="font-extralight w-[48%] p-4 ">
                      Join our HUGO BOSS EXPERIENCE community to receive
                      exclusive benefits such as Members' Only promotions,
                      invitations to events, access to exclusive products and
                      much more. Sign up today and enjoy a variety of benefits,
                      from exclusive gifts to VIP prizes!
                    </div>
                  </div>
                  <div className="flex ml-8 mt-4 text-sm font-bold">
                    <span className="">
                      <ChevronRight size={20} strokeWidth={1.5} />
                    </span>
                    <span className="ml-4">DISCOVER MORE</span>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="pl-4">
                <AccordionTrigger>CONTACT</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col ml-8">
                    <div className="text-base max-w-[10rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      LIVE CHAT & STYLE ADVICE
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Customer Care
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Whatsapp**
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Email Us
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Store Locator
                    </div>
                    <div className="flex ml-8 mt-4 text-sm font-bold">
                      <span className="">
                        <ChevronRight size={20} strokeWidth={1.5} />
                      </span>
                      <span className="ml-4">HELP & CONTACT</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="pl-4">
                <AccordionTrigger>SERVICES</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col ml-8">
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Christmas FAQ
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Delivery
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      How to Return
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Return Portal
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      BOLD FOR THE PLANET
                    </div>
                    <div className="flex flex-row flex-wrap mb-[16px] mr-[24px]">
                      <div className="mr-4">
                        <img
                          src="/footerImages/visa.png"
                          height={40}
                          width={40}
                          alt=""
                        />
                      </div>
                      <div className="mr-4">
                        <img
                          src="/footerImages/mastercard.png"
                          height={40}
                          width={40}
                          alt=""
                        />
                      </div>
                      <div className="mr-4">
                        <img
                          src="/footerImages/americanexpress.png"
                          height={40}
                          width={40}
                          alt=""
                        />
                      </div>
                      <div className="mr-4">
                        <img
                          src="/footerImages/paypal.png"
                          height={40}
                          width={40}
                          alt=""
                        />
                      </div>
                      <div className="mr-4">
                        <img
                          src="/footerImages/dinersclub.png"
                          height={40}
                          width={40}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex ml-8 mt-4 text-sm font-bold">
                      <span className="">
                        <ChevronRight size={20} strokeWidth={1.5} />
                      </span>
                      <span className="ml-4">FAQ</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="pl-4">
                <AccordionTrigger>OUR COMPANY</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col ml-8">
                    <div className="text-base max-w-[10rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Careers
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Investor Relations
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Sustainability
                    </div>
                    <div className="text-base max-w-[15rem] min-h-[24px] mb-[16px] mr-[24px] font-normal">
                      Press
                    </div>
                    <div className="flex ml-8 mt-4 text-sm font-bold">
                      <span className="">
                        <ChevronRight size={20} strokeWidth={1.5} />
                      </span>
                      <span className="ml-4">CORPORATE WEBSITE</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </div>
      <div className="flex flex-col min-w-full pt-10 bg-[#f6f6f6]">
        <div className="flex md:flex-row flex-col max-[768px]:gap-4 max-[768px]:items-center max-[768px]:text-center">
          <div className="w-7/12 flex md:flex-row flex-col md:space-x-8 max-[768px]:gap-2 md:pl-[50px] font-normal max-[768px]:w-full">
            <div>FOLLOW US</div>
            <div className="flex space-x-4 max-[768px]:flex-wrap self-center">
              <div className="bg-black p-1">
                <Instagram size={16} color="#ffffff" strokeWidth={1.5} />
              </div>
              <div className="bg-black p-1">
                <Facebook
                  size={16}
                  color="#ffffff"
                  strokeWidth={1.5}
                  fill="white"
                />
              </div>
              <div className="bg-black p-1">
                <Twitter
                  size={16}
                  color="#ffffff"
                  strokeWidth={1.5}
                  fill="white"
                />
              </div>
              <div className="bg-black p-1">
                <Youtube size={16} color="#ffffff" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <div className="w-5/12 flex md:flex-row-reverse flex-col-reverse gap-2 md:pr-[50px]  max-[768px]:w-full font-normal">
            <div className="flex gap-1 md:pr-[42px] max-[768px]:self-center">
              <span>{country}</span>
              <span className="md:ml-4">
                <MoveRight size={20} color="#000000" strokeWidth={1.75} />
              </span>
            </div>
            <span>CHANGE COUNTRY: </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 justify-center text-xs mt-8 pt-8 sm:px-8 md:px-12  lg:px-40  xl:px-72 bg-[#F0F0F0]">
          <span>Imprint</span>
          <span>Privacy Statement</span>
          <span>Privacy Statement HUGO BOSS EXPERIENCE</span>
          <span>Privacy Statement HUGO BOSS Newsletter</span>
          <span>Terms & Conditions</span>
          <span>Terms & Conditions HUGO BOSS EXPERIENCE</span>
          <span>Terms of use</span>
          <span>Cookie settings</span>
        </div>
        <div className="bg-[#F0F0F0] p-8 text-xs font-semibold text-center">
          © 2023 HUGO BOSS All rights reserved.
        </div>
      </div>
    </div>
  )
}

export default FooterNav
