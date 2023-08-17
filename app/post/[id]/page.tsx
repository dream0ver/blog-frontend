import ButtonPrimary from "@/components/ButtonPrimary"
import axios from "@/util/axios"
import endpoints from "@/util/endpoints"
import { PostCardPropType } from "@/util/types"
import Image from "next/image"
import Link from "next/link"
export default async function Page({ params }: { params: any }) {
  const URL = endpoints.getPostByID + (params?.id ? params.id : "")
  const post_info: PostCardPropType = await axios.get(URL).then(res => res.data)

  return (
    <>
      <Link href="/">
        <ButtonPrimary label="Back" />
      </Link>
      <div className="relative h-[500px]  rounded-3xl overflow-hidden my-4">
        <Image
          src={post_info.image}
          alt={post_info.title}
          fill
          className="object-cover"
        />
      </div>
      <h1
        className="text-slate-700 font-extrabold text-[48px]"
        contentEditable={false}
      >
        {post_info.title}
      </h1>
      <div className="flex justify-between">
        <span className="font-extrabold text-purple-500">
          {post_info.category.toUpperCase()}
        </span>
        <span className="text-slate-600 font-light">Posted by dream0ver</span>
      </div>
      <p
        className="text-slate-600 text-justify text-lg mt-10"
        contentEditable={false}
      >
        {post_info.body}
      </p>
    </>
  )
}
