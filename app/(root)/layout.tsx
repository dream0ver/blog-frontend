import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-12rem)] my-8">{children}</div>
      <Footer />
    </>
  )
}
