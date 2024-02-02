import Providers from "@modules/providers"
import "../styles/globals.css"
import { Inter } from "next/font/google"

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] })

const myStyles = {
  fontFamily: "AvertaPE, sans-serif",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <Providers>
          <main style={myStyles}>
            <div className="mt-[129px]">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  )
}
