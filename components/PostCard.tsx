import { PostCardPropType } from "@/util/types"
import Image from "next/image"
import ButtonPrimary from "./ButtonPrimary"
import Link from "next/link"

export default function PostCard(props: PostCardPropType) {
  return (
    <article className="h-[400px]  bg-purple-50 rounded-3xl grid grid-cols-2 gap-6 p-6 cursor-pointer border-2 border-purple-100">
      {props.image && (
        <div className="relative rounded-3xl overflow-hidden">
          <Image
            className="object-cover"
            src={props.image}
            alt={props.title}
            fill
          />
          <span className="text-white absolute bg-purple-500 py-2 px-4 rounded-3xl bottom-4 left-4">
            {props.category.toUpperCase()}
          </span>
        </div>
      )}
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-purple-500">{props.title}</h2>
        <p className="text-md font-medium text-md text-gray-800 line-clamp-6">
          {props.body}
        </p>
        <Link
          href={`/post/${props.id}`}
          className="contents"
        >
          <ButtonPrimary
            label="Read More"
            buttonClass="mt-auto"
          />
        </Link>
      </div>
    </article>
  )
}
