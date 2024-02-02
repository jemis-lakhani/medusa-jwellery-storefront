import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { ArrowDownUp, ChevronDown, SlidersHorizontal } from "lucide-react"
import clsx from "clsx"
import React, { useState } from "react"
import Link from "next/link"

interface FilterProps {
  onFilterClick: (value: string) => void
  totalCount: number
  hugoCount: number
  bossCount: number
  brandUrl: string
  brandSelected?: string
}

const count = 10,
  count1 = 20,
  count2 = 125,
  filterCount = 12

const brands = ["HUGO", "BOSS", "ALL BRANDS"]
const sort = [
  "Sort",
  "Most Popular",
  "Newest",
  "Price (low-high)",
  "Price(high-low)",
]
const getBrandStyle = (value: string) => {
  return value === "HUGO"
    ? { backgroundColor: "#B51F29", color: "white" }
    : value === "BOSS"
    ? { backgroundColor: "white", color: "black" }
    : { backgroundColor: "black", color: "white" }
}
const getFilterStyle = (value: string) => {
  return value === "HUGO"
    ? { backgroundColor: "white", color: "#B51F29" }
    : value === "BOSS"
    ? { backgroundColor: "black", color: "white" }
    : { backgroundColor: "white", color: "black" }
}

const Filter: React.FC<FilterProps> = ({
  onFilterClick,
  totalCount,
  hugoCount,
  bossCount,
  brandUrl,
  brandSelected,
}) => {
  const [selectedBrand, setSelectedBrand] = useState(
    brandSelected ?? "ALL BRANDS"
  )
  const [selectedSort, setSelectedSort] = useState("Sort")
  const [isBrandOpen, setIsBrandOpen] = useState(false)

  return (
    <div
      style={getBrandStyle(selectedBrand)}
      className="z-[20] shadow-[0_6px_28px_0_rgba(0,0,0,0.16)] flex flex-row gap-2 h-[48px] bg-[#B51F29] max-w-fit min-w-fit rounded-lg items-center text-white pl-4 py-1 pr-[2px]"
    >
      <DropdownMenuPrimitive.Root
        onOpenChange={() => setIsBrandOpen(!isBrandOpen)}
      >
        <DropdownMenuPrimitive.Trigger asChild>
          <div className="flex flex-row gap-2 cursor-pointer">
            <div className="text-sm font-bold">{selectedBrand}</div>
            <div className="text-xs mt-1">
              (
              {selectedBrand === "HUGO"
                ? hugoCount
                : selectedBrand === "BOSS"
                ? bossCount
                : totalCount}
              )
            </div>
            <div
              className={`transform transition-transform transition ${
                isBrandOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDown size={20} strokeWidth={4} />
            </div>
          </div>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="start"
            sideOffset={5}
            className={clsx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "w-48 py-1 shadow-md md:w-36 top-9",
              "bg-black dark:bg-black rounded-b-md",
              "absolute top-[9px]"
            )}
          >
            {brands
              .filter((value) => value !== selectedBrand)
              .map((value, index) => (
                <Link
                  key={index}
                  href={`${brandUrl}?${
                    value === "HUGO"
                      ? "brand=HUGO"
                      : value === "BOSS"
                      ? "brand=BOSS"
                      : ""
                  }`}
                >
                  <DropdownMenuPrimitive.Item
                    className={clsx(
                      "flex cursor-pointer select-none items-center px-2 py-2 text-xs outline-none",
                      "text-white hover:bg-gray-700 focus:bg-gray-400 dark:text-white dark:focus:bg-gray-400"
                    )}
                    onSelect={() => setSelectedBrand(value)}
                  >
                    <span className="text-sm font-bold">{value}</span>
                    <span className="ml-auto">
                      (
                      {value === "HUGO"
                        ? hugoCount
                        : value === "BOSS"
                        ? bossCount
                        : totalCount}
                      )
                    </span>
                  </DropdownMenuPrimitive.Item>
                </Link>
              ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
      <div
        onClick={() => onFilterClick("FilterOverlay")}
        style={getFilterStyle(selectedBrand)}
        className="flex cursor-pointer h-full rounded-lg items-center gap-2 px-2"
      >
        <span className="text-sm font-semibold">Filter ({filterCount})</span>
        <span>
          <SlidersHorizontal size={12} strokeWidth={1.75} />
        </span>
      </div>
      <DropdownMenuPrimitive.Root>
        <DropdownMenuPrimitive.Trigger asChild>
          <div
            style={
              selectedBrand === "BOSS" ? { borderColor: "black" } : undefined
            }
            className="flex h-full rounded-lg items-center gap-2 px-2 border-solid border-[1px] border-white"
          >
            <span className="text-sm font-bold">{selectedSort}</span>
            <span>
              <ArrowDownUp size={12} strokeWidth={1.75} />
            </span>
          </div>
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="start"
            sideOffset={5}
            className={clsx(
              "radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down",
              "w-48 shadow-md md:w-36 top-9",
              "bg-white dark:bg-white",
              "absolute top-[-1px] border-solid border-[1px] border-black"
            )}
          >
            {sort.map((value, index) => (
              <DropdownMenuPrimitive.Item
                key={index}
                style={
                  value === selectedSort
                    ? { backgroundColor: "black", color: "white" }
                    : undefined
                }
                className={clsx(
                  "flex cursor-default select-none items-center px-2 py-2 text-xs outline-none",
                  "text-black hover:bg-black hover:text-white"
                )}
                onSelect={() => setSelectedSort(value)}
              >
                <span className="text-sm font-semibold">{value}</span>
              </DropdownMenuPrimitive.Item>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>
    </div>
  )
}

export default Filter
