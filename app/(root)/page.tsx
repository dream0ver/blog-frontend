"use client"
import Posts from "@/components/Posts"
import axios from "@/util/axios"
import endpoints from "@/util/endpoints"
import { PostCardPropType } from "@/util/types"
import { useEffect, useState } from "react"

export default function Home({ searchParams }: { searchParams: any }) {
  const [posts, setPosts] = useState<PostCardPropType[] | []>([])
  const fetchPosts = () => {
    const URL =
      endpoints.getPostByCategory + (searchParams?.cat ? searchParams.cat : "")
    axios.get(URL).then(res => setPosts(res.data))
  }

  useEffect(() => {
    fetchPosts()
  }, [searchParams])

  return (
    <main>
      <Posts posts={posts} />
    </main>
  )
}
