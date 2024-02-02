"use client"

import CountrySelect from "@modules/layout/components/country-select"
import SecondaryNav from "@modules/layout/components/secondary-nav"
import MobileMenu from "@modules/mobile-menu/templates"
import { Heart, MapPin, Search, User } from "lucide-react"
import Link from "next/link"
import React from "react"
import { useToggleState } from "@medusajs/ui"
import CartDropdown from "@modules/layout/components/cart-dropdown"

const Nav = () => {
  const toggleState = useToggleState()
  return (
    <div className="sticky top-0 z-[30] group w-full">
      <header
        className={`fixed top-0 w-full h-auto text-black px-8 mx-auto border-0 duration-100 bg-white border-ui-border-base`}
      >
        <div className="h-8 flex items-center justify-center font-bold underline text-sm tracking-normal">
          <a>Free shipping to India on orders above ₹8000</a>
        </div>
        <nav className="flex items-center justify-between w-full max-h-[52px] min-h-[52px] h-[52px] mb-2.5">
          <div
            className="flex items-center relative z-[501]  h-full"
            style={{ maxWidth: "36%", minWidth: "36%" }}
          >
            <Link
              href="/"
              className="uppercase font-extrabold text-xl tracking-[2px]"
            >
              Medusa
            </Link>
          </div>
          <div
            className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end w-1/3 pr-4"
            style={{ maxWidth: "36%", minWidth: "36%" }}
          >
            <ul className="flex item-center jutstify-center">
              <Link href="/">
                <li className="w-auto m-3.5 inline-block text-lg  pt-1">
                  <Search size={20} strokeWidth={1.5} />
                </li>
              </Link>
              <Link href="/">
                <li className="w-auto m-3.5 inline-block text-lg  w-{14} h-{14}">
                  <span>IN (₹)</span>
                </li>
              </Link>
              <Link href="/">
                <li className="w-auto m-3.5 inline-block text-lg  pt-1">
                  <MapPin size={20} strokeWidth={1.5} />
                </li>
              </Link>
              <Link href="/account/login">
                <li className="w-auto m-3.5 inline-block text-lg  pt-1">
                  <User size={20} strokeWidth={1.5} />
                </li>
              </Link>
              <Link href="/">
                <li className="w-auto m-3.5 inline-block text-lg  pt-1">
                  <Heart size={20} strokeWidth={1.5} />
                </li>
              </Link>
              <div className="flex w-auto m-3.5 text-lg">
                <CartDropdown />
              </div>
              <div
                className="w-auto m-3.5 inline-block text-lg"
                onMouseEnter={toggleState.open}
                onMouseLeave={toggleState.close}
              >
                <CountrySelect toggleState={toggleState} />
              </div>
            </ul>
          </div>
        </nav>
        <SecondaryNav />
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
