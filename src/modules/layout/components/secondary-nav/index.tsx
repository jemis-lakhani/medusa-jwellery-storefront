import { BASE_URL } from "@lib/constants"
import { getCollectionsList } from "@lib/data"
import { ProductCollection } from "@medusajs/medusa"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useMemo, useState } from "react"

const SecondaryNav = () => {
  const path = usePathname()
  const currentHandle = path.split("/").pop()
  const [collections, setCollections] = useState<ProductCollection[]>([])
  const [isItemHovered, setItemHovered] = useState<boolean>()
  const [hoveredItem, setHoveredItem] = useState<string>()
  const [subCollection, setSubCollection] = useState<ProductCollection[]>([])

  const fetchCollectionList = async () => {
    const { collections } = await getCollectionsList()
    setCollections(collections)
  }

  useEffect(() => {
    if (collections) {
      const collection = collections.filter(
        (c) => c.metadata && c.metadata.parent === hoveredItem
      )
      setSubCollection(collection)
    }
  }, [hoveredItem])

  useMemo(() => {
    fetchCollectionList()
  }, [])

  return (
    <>
      <div className="text-center h-[45px] tracking-normal">
        <ul className="w-auto bg-transperent text-center inline-block overflow-visible">
          {collections &&
            collections.map((item) => {
              if (item.metadata.name) {
                return (
                  <li
                    className="static block p-0 float-left"
                    key={item.id}
                    onMouseEnter={() => {
                      setItemHovered(true),
                        setHoveredItem(item.title.toLowerCase())
                    }}
                    onMouseLeave={() => {
                      setItemHovered(false), setHoveredItem("")
                    }}
                  >
                    <Link
                      href={`${BASE_URL}/collections/${item.handle}`}
                      className={`main-header relative py-3 px-3.5 uppercase block no-underline text-sm text-left ${
                        currentHandle === item.handle ? "font-bold" : ""
                      }`}
                    >
                      {item.title}
                    </Link>
                    <div
                      className={clsx("p-6 mb-16 sm:mb-0 shadow-sm", {
                        "hidden absolute bg-white w-full opacity-100 left-0 visible transition-visible ease-in-out duration-500 z-100":
                          hoveredItem === item.title.toLowerCase(),
                        "hidden opacity-0 w-0 z-0":
                          hoveredItem !== item.title.toLowerCase(),
                      })}
                      onMouseEnter={() => {
                        setItemHovered(true), setHoveredItem(hoveredItem)
                      }}
                      onMouseLeave={() => {
                        setItemHovered(false), setHoveredItem("")
                      }}
                    >
                      <div className="container mx-auto flex flex-wrap justify-between w-[67%]">
                        <div className="w-full text-white mb-8">
                          <ul className="grid grid-cols-4 gap-3">
                            <div>
                              {isItemHovered &&
                                hoveredItem === item.title.toLowerCase() &&
                                subCollection
                                  .slice(0, subCollection.length)
                                  .map((data, index) => (
                                    <li
                                      key={index + "-" + item.title}
                                      className={`text-sm text-left text-white py-2.5 leading-6`}
                                    >
                                      <Link
                                        href={`${BASE_URL}/collections/${data.handle}`}
                                        className="hover:underline py-6"
                                      >
                                        {data?.title}
                                      </Link>
                                    </li>
                                  ))}
                            </div>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              }
            })}
        </ul>
      </div>
    </>
  )
}

export default SecondaryNav
