"use client"
import useAuth from "@/hooks/useAuth"
import Link from "next/link"
import ButtonPrimary from "./ButtonPrimary"
import NavbarCategories from "./NavbarCategories"
export default function Navbar() {
  const { auth, isLoggedIn, logout } = useAuth()
  return (
    <header className="flex justify-between items-center h-[5rem]">
      <Link href="/">
        <h1 className="text-6xl font-extrabold text-purple-500">dreamLand.</h1>
      </Link>
      <div className="flex gap-10 items-center">
        <NavbarCategories />
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="text-purple-500 font-bold">{`${
              auth.roles?.includes(9000) ? `#${auth.username}` : auth.username
            }`}</span>
            <ButtonPrimary
              onClick={logout}
              label="Sign out"
            />
          </div>
        ) : (
          <Link href="/sign-in">
            <ButtonPrimary label="Sign in" />
          </Link>
        )}
      </div>
    </header>
  )
}
