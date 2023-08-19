"use client"
import ButtonPrimary from "@/components/ButtonPrimary"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import axios from "@/util/axios"
import endpoints from "@/util/endpoints"
import { PostCardPropType } from "@/util/types"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
export default function Page({ params }: { params: any }) {
  const URL = endpoints.getPostByID + (params?.id ? params.id : "")
  const [post_info, set_post_info] = useState<PostCardPropType | null>()
  const { push } = useRouter()
  const { auth } = useAuth()
  const getPostInfo = () => {
    axios
      .get(URL)
      .then(res => {
        set_post_info(res.data)
      })
      .catch(err => {
        toast.error("Error while fetching post data.")
        push("/")
      })
  }
  const [editing, setEditing] = useState(false)
  const showEditButton = post_info?.user_id == auth.id
  const showChangeButton = post_info?.user_id == auth.id && editing
  const showDeleteButton =
    auth.roles?.includes(9000) || (post_info?.user_id == auth.id && !editing)
  const axiosPrivate = useAxiosPrivate()
  const titleRef = useRef<any>()
  const bodyRef = useRef<any>()

  const saveChanges = () => {
    if (!titleRef.current.innerText)
      return toast.error("Title cannot be empty !")
    if (!bodyRef.current.innerText)
      return toast.error("Content cannot be empty !")
    axiosPrivate
      .put(endpoints.editPost, {
        ...post_info,
        title: titleRef.current.innerText,
        body: bodyRef.current.innerText,
        userId: post_info?.user_id
      })
      .then(res => {
        toast.success(res.data.message)
        setEditing(false)
        getPostInfo()
      })
      .catch(err => {
        toast.error(err?.response?.data?.error || err?.message)
      })
  }

  const deletePost = () => {
    axiosPrivate
      .delete(endpoints.deletePost + post_info?.id)
      .then(res => {
        toast.success(res.data.message)
        push("/")
      })
      .catch(err => {
        toast.error(err?.response?.data?.error || err?.message)
      })
  }

  useEffect(() => {
    getPostInfo()
  }, [])

  return (
    <>
      <div className="flex justify-between my-4">
        <Link href="/">
          <ButtonPrimary label="Back" />
        </Link>
        <div className="flex gap-4">
          {showEditButton && (
            <ButtonPrimary
              label={editing ? "Cancel Edit" : "Edit Post"}
              onClick={() =>
                setEditing(prev => {
                  if (prev) {
                    titleRef.current.innerText = post_info?.title
                    bodyRef.current.innerText = post_info?.body
                  }
                  return !prev
                })
              }
            />
          )}
          {showChangeButton && (
            <ButtonPrimary
              label="Save Changes"
              onClick={saveChanges}
            />
          )}
          {showDeleteButton && (
            <ButtonPrimary
              label="Delete Post"
              onClick={deletePost}
            />
          )}
        </div>
      </div>
      {post_info?.image && (
        <div className="relative h-[500px]  rounded-3xl overflow-hidden my-4">
          <Image
            src={post_info?.image}
            alt={post_info?.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <h1
        className={`text-slate-700 font-extrabold text-[48px] ${
          editing && "border-2 border-slate-950"
        }`}
        contentEditable={editing}
        ref={titleRef}
      >
        {post_info?.title}
      </h1>
      <div className="flex justify-between">
        <span className="font-extrabold text-purple-500">
          {post_info?.category?.toUpperCase()}
        </span>
        <span className="text-slate-600 font-light">{`Posted by ${post_info?.user_id}`}</span>
      </div>
      <p
        className={`text-slate-600 text-justify text-lg mt-10 ${
          editing && "border-2 border-slate-950"
        } `}
        contentEditable={editing}
        ref={bodyRef}
      >
        {post_info?.body}
      </p>
    </>
  )
}
