"use client"
import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"

export default function PersistLogin() {
  const { getAccessToken } = useAuth()
  useEffect(() => {
    getAccessToken()
  }, [])
  return <></>
}
