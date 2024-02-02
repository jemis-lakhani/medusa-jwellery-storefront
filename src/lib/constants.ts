export const IS_BROWSER = typeof window !== "undefined"
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export type Categoriestype = {
  [key: string]: {
    image: string
  }
}
export const CATEGORIES: Categoriestype = {
  watches: {
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu58115532_999_200?wid=140&qlt=80",
  },
  glasses: {
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu58109582_999_220?wid=140&qlt=80",
  },
  jackets: {
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50496280_001_100?wid=140&qlt=80",
  },
  jeans: {
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50493883_435_100?wid=140&qlt=80",
  },
  boots: {
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50512726_001_200?wid=140&qlt=80",
  },
  sneakers: {
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50498904_479_200?wid=140&qlt=80",
  },
}

export const SALE_COLLECTIONS_LIST = [
  {
    handle: "/",
    title: "All Menswear",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50495010_280_170?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-jackets",
    title: "Jackets",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50496280_001_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-coats",
    title: "Coats",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50499551_375_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-sweaters",
    title: "Sweaters & Cardigans",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50500002_028_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-shirts",
    title: "Shirts",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50496698_100_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-polo-tshirts",
    title: "Polo Shirts",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50468983_065_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-tshirts",
    title: "T-Shirts",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50494339_001_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-sweats",
    title: "Sweats",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50501207_402_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-trousers",
    title: "Trousers & Shorts",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50470813_407_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-jeans",
    title: "Jeans",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50493883_435_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-shoes",
    title: "Shoes",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50498672_256_200?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-suits",
    title: "Suits",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50502519_021_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-blazers",
    title: "Blazers",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50497273_612_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-tracksuits",
    title: "Tracksuits",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50498277_001_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-nightware-loungeware",
    title: "Nightware & Loungeware",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50501773_100_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-underware-socks",
    title: "Underware & Socks",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50495976_001_100?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-watches",
    title: "Watches",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu58115532_999_200?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-bags",
    title: "Bags",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50504317_001_200?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-belts",
    title: "Belts",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu50486973_004_200?wid=140&qlt=80",
  },
  {
    handle: "/sale-men-more-accessories",
    title: "More Accessories",
    image:
      "https://images.hugoboss.com/is/image/boss/hbeu58109585_999_220?wid=140&qlt=80",
  },
]

export const FILTER_CATEGORIES = {
  category: [
    { item: "Blazers", value: 2 },
    { item: "Jackets", value: 34 },
    { item: "Coats", value: 2 },
  ],
  size: ["XS", "S", "M", "L", "XL", 32, 34, 36, 38, 40, 42, 44, 46],
  color: [
    {
      name: "Black",
      code: "#000000",
      value: 325,
    },
    { name: "Silver", code: "#C0C0C0", value: 45 },
    { name: "Gray", code: "#808080", value: 45 },
    { name: "White", code: "#FFFFFF", value: 45 },
    { name: "Maroon", code: "#800000", value: 45 },
    { name: "Purple", code: "#800080", value: 45 },
    { name: "Fuchsia", code: "#FF00FF", value: 45 },
    { name: "Green", code: "#008000", value: 45 },
    { name: "Lime", code: "#00FF00", value: 45 },
    { name: "Yellow", code: "#FFFF00", value: 45 },
  ],
  fit: [
    { item: "Slim Fit", value: 2 },
    { item: "Relaxed Fit", value: 34 },
    { item: "Regular Fit", value: 2 },
  ],
  features: [
    { item: "Water Repellant", value: 109 },
    { item: "Fashion Show", value: 5 },
    { item: "Larger sizes available", value: 2 },
    { item: "All gender", value: 1 },
    { item: "Porsche Capsule", value: 2 },
  ],
  material: [
    { item: "Cotton", value: 19 },
    { item: "Leather", value: 16 },
    { item: "Wool", value: 11 },
    { item: "Synthetic", value: 132 },
    { item: "Cellulose", value: 1 },
  ],
  pattern: [
    { item: "Plain", value: 152 },
    { item: "Motive", value: 5 },
    { item: "Patterned", value: 4 },
    { item: "Milange", value: 2 },
    { item: "Check", value: 1 },
  ],
  collar: [
    { item: "Stand collar", value: 42 },
    { item: "Shirt collar", value: 28 },
    { item: "Hooded collar", value: 25 },
    { item: "Point collar", value: 10 },
    { item: "Kent collar", value: 1 },
  ],
}

// Carousel
export type ResponsiveObject = {
  [key: number]: {
    items: number
    itemsFit: string
  }
}

export const getBreakPoint = (breakpoints: number[]) => {
  if (typeof window !== "undefined") {
    const windowWidth = window.innerWidth
    for (let i = 0; i < breakpoints.length; i++) {
      if (windowWidth >= breakpoints[i]) {
        return breakpoints[i]
      }
    }
  }
  return 0
}

// Product varinats
export const VARIANTS_CAROUSEL = [1440, 1024, 568, 0]
export const VARIANTS_RESPONSIVE: ResponsiveObject = {
  0: {
    items: 1,
    itemsFit: "contain",
  },
  568: {
    items: 1,
    itemsFit: "contain",
  },
  1024: {
    items: 4,
    itemsFit: "contain",
  },
  1440: {
    items: 5,
    itemsFit: "contain",
  },
}
export const GET_VARIANTS_ITEMS_PER_SLIDE =
  VARIANTS_RESPONSIVE[getBreakPoint(VARIANTS_CAROUSEL)].items

// Collection categories
export const CATEGORIES_CAROUSEL = [1680, 1440, 1024, 568, 0]
export const CATEGORIES_RESPONSIVE: ResponsiveObject = {
  0: {
    items: 1,
    itemsFit: "contain",
  },
  568: {
    items: 2,
    itemsFit: "contain",
  },
  1024: {
    items: 4,
    itemsFit: "contain",
  },
  1440: {
    items: 9,
    itemsFit: "contain",
  },
  1680: {
    items: 10,
    itemsFit: "contain",
  },
}
export const GET_CATEGORIES_ITEMS_PER_SLIDE =
  CATEGORIES_RESPONSIVE[getBreakPoint(CATEGORIES_CAROUSEL)].items
