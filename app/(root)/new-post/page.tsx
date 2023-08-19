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
import { useRef } from "react"
import axios from "@/util/axios"
import Image from "next/image"

export default function Page() {
  const { isLoggedIn, auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const fileInputRef = useRef<any>()
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
  const onFileChange = (e: any) => {
    const file = e.target.files[0]

    if (!file.name) return
    const formData = new FormData()
    formData.append("file", file)
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }
    axios
      .post(endpoints.uploadFile, formData, config)
      .then(res => {
        toast.success(res.data.message)
        setState(prev => ({ ...prev, image: res.data.url }))
      })
      .catch(err => {
        toast.error("Error occurred while uploading the image.")
      })
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
          <input
            ref={fileInputRef}
            type="file"
            name="image"
            className="hidden"
            onChange={onFileChange}
          />
          <ButtonPrimary
            label="Attach Image"
            onClick={() => fileInputRef.current.click()}
          />
          <ButtonPrimary
            label="Post"
            onClick={onPost}
          />
        </div>
      </div>
      <section className="mt-4 flex flex-col">
        {state.image && (
          <div className="relative h-[500px]  rounded-3xl overflow-hidden my-4">
            <Image
              src={"/" + state.image}
              alt={"image"}
              fill
              className="object-cover"
            />
          </div>
        )}
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
