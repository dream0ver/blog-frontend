"use client"
import { useSearchParams } from "next/navigation"
import { CATEGORIES } from "@/util/constants"
import Link from "next/link"
export default function NavbarCategories() {
  const currentCategory = useSearchParams()?.get("cat") || "all"
  return (
    <ul className="flex gap-8">
      {CATEGORIES.map(cat => (
        <Link href={cat.path}>
          <li
            className={`uppercase ${
              cat.label.toLocaleLowerCase() == currentCategory &&
              "text-purple-500 font-bold"
            } hover:text-purple-500 `}
          >
            {cat.label}
          </li>
        </Link>
      ))}
    </ul>
  )
}
