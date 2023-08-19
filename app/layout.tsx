import PersistLogin from "@/components/PersistLogin"
import AuthContextProvider from "@/context/AuthContext"
import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"
export const metadata: Metadata = {
  title: "dreamLand",
  description: "Blog app"
}
export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://stijndv.com"
        />
        <link
          rel="stylesheet"
          href="https://stijndv.com/fonts/Eudoxus-Sans.css"
        />
      </head>
      <body className="mx-auto w-[1400px]">
        <AuthContextProvider>
          {children}
          <PersistLogin />
          <ToastContainer
            position="bottom-right"
            hideProgressBar={true}
            pauseOnFocusLoss={false}
          />
        </AuthContextProvider>
      </body>
    </html>
  )
}
