"use client"
import { AuthContextType } from "@/util/types"
import React, { createContext, useState } from "react"
export const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {}
})
export default function AuthContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [auth, setAuth] = useState({})
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
