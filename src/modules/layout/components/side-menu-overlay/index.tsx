"use client"
import React, { useState } from "react"

type Props = {}

const SideMenuOverlay = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div
        style={isOpen ? { width: "250px" } : { width: "0px" }}
        id="mySidenav"
        className="h-full w-0 fixed bg-[red] overflow-x-hidden transition-[0.5s] pt-[60px] left-0 top-0 z-[100]!important"
      >
        <a
          href=""
          className="absolute text-4xl ml-[50px] right-[25px] top-0"
          onClick={() => setIsOpen(false)}
        >
          &times;
        </a>
        <a
          href="#"
          className="no-underline text-[25px] text-[#818181] block transition-[0.3s] pl-8 pr-2 py-2 hover:text-[#f1f1f1]"
        >
          About
        </a>
        <a
          href="#"
          className="no-underline text-[25px] text-[#818181] block transition-[0.3s] pl-8 pr-2 py-2 hover:text-[#f1f1f1]"
        >
          Services
        </a>
        <a
          href="#"
          className="no-underline text-[25px] text-[#818181] block transition-[0.3s] pl-8 pr-2 py-2 hover:text-[#f1f1f1]"
        >
          Clients
        </a>
        <a
          href="#"
          className="no-underline text-[25px] text-[#818181] block transition-[0.3s] pl-8 pr-2 py-2 hover:text-[#f1f1f1]"
        >
          Contact
        </a>
      </div>

      <span
        style={{ fontSize: "30px", cursor: "pointer" }}
        onClick={() => setIsOpen(true)}
      >
        &#9776; open
      </span>
    </div>
  )
}

export default SideMenuOverlay
