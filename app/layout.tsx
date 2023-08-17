import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import AuthContextProvider from "@/context/AuthContext"
import type { Metadata } from "next"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./globals.css"
import PersistLogin from "@/components/PersistLogin"
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
      <body className="my-0 mx-auto w-[1600px] select-none">
        <AuthContextProvider>
          <Navbar />
          <div className="min-h-[calc(100vh-12rem)] my-8">{children}</div>
          <Footer />
          <PersistLogin />
        </AuthContextProvider>
        <ToastContainer
          position="bottom-right"
          hideProgressBar={true}
          pauseOnFocusLoss={false}
        />
      </body>
    </html>
  )
}
