"use client"
import ButtonPrimary from "@/components/ButtonPrimary"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { CATEGORIES } from "@/util/constants"
import endpoints from "@/util/endpoints"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Page() {
  const { isLoggedIn, auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const { push } = useRouter()
  !isLoggedIn && redirect("/")
  const [state, setState] = useState({
    title: "",
    body: "",
    category: "",
    image: ""
  })
  const handleChange = (e: any) => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const onPost = () => {
    if (!state.title) return toast.error("Title cannot be empty !")
    if (!state.category) return toast.error("Category cannot be empty !")
    if (!state.body) return toast.error("Content cannot be empty !")
    axiosPrivate
      .post(endpoints.createPost, {
        title: state.title,
        category: state.category,
        body: state.body,
        userId: auth.id,
        userName: auth.username
      })
      .then(res => {
        push("/")
        toast.success(res.data.message)
      })
      .catch(err => {
        toast.error(err?.response?.data?.error || err?.message)
      })
  }

  return (
    <>
      <div className="flex justify-between">
        <Link href="/">
          <ButtonPrimary label="Back" />
        </Link>
        <div className="flex gap-4">
          <ButtonPrimary label="Attach Image" />
          <ButtonPrimary
            label="Post"
            onClick={onPost}
          />
        </div>
      </div>
      <section className="mt-4 flex flex-col">
        <div className="flex gap-4 my-4">
          <input
            onChange={handleChange}
            name="title"
            autoComplete="off"
            type="text"
            placeholder="Post Title"
            className="outline-none border border-slate-200 p-5 text-3xl rounded-3xl font-bold  flex-grow"
          />
          <select
            onChange={handleChange}
            name="category"
            className="outline-none border border-slate-200 p-5 rounded-3xl  font-bold"
          >
            <option
              disabled
              selected
            >
              Please select
            </option>
            {CATEGORIES.filter(cat => cat.value).map(cat => (
              <option value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <textarea
          onChange={handleChange}
          name="body"
          placeholder="Post Content"
          className="outline-none border border-slate-200 p-5 rounded-3xl text-xl resize-none h-[600px]"
          maxLength={10000}
        ></textarea>
      </section>
    </>
  )
}
