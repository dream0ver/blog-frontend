"use client"
import ButtonPrimary from "@/components/ButtonPrimary"
import axios from "@/util/axios"
import endpoints from "@/util/endpoints"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"
import useAuth from "@/hooks/useAuth"

export default function Page() {
  const [state, setState] = useState({ username: "", password: "" })
  const router = useRouter()
  const { setAuth } = useAuth()

  const handleChange = (e: any) => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSignIn = () => {
    if (!state.username || !state.password) {
      return toast.error("Username and Password fields are required.")
    }
    axios
      .post(endpoints.login, {
        username: state.username,
        password: state.password
      })
      .then(res => {
        toast.success("Login Successfull.")
        setAuth(res.data)
        router.push("/")
      })
      .catch(err => {
        toast.error(err.response.data.message)
      })
  }

  return (
    <section className="w-[400px] h-[500px] bg-white border border-slate-200 absolute rounded-3xl p-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-purple-500 text-[50px] font-extrabold">Sign In</h1>
      <div className="flex flex-col">
        <label className="text-slate-600 font-bold my-4 text-xl">
          Username
        </label>
        <input
          className="p-4 border-2 outline-none rounded-lg font-bold focus:border-purple-500"
          type="text"
          placeholder="Please enter"
          name="username"
          onChange={handleChange}
          maxLength={12}
        />
        <label className="text-slate-600 font-bold my-4 text-xl">
          Password
        </label>
        <input
          className="p-4 border-2 outline-none rounded-lg font-bold focus:border-purple-500"
          placeholder="Please enter"
          type="password"
          name="password"
          onChange={handleChange}
          maxLength={12}
        />
        <ButtonPrimary
          label="Sign In"
          buttonClass="mt-10"
          onClick={onSignIn}
        />
        <Link href="/register">
          <p className="mt-4">
            Dont have an account ?{"  "}
            <span className="text-purple-500 font-bold cursor-pointer">
              Sign Up
            </span>
          </p>
        </Link>
        <Link href="/">
          <p>
            Continue as{" "}
            <span className="text-purple-500 font-bold cursor-pointer">
              Guest
            </span>
          </p>
        </Link>
      </div>
    </section>
  )
}
