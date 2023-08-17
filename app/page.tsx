import Posts from "@/components/Posts"
import axios from "@/util/axios"
import endpoints from "@/util/endpoints"
import { PostCardPropType } from "@/util/types"
export default async function Home({ searchParams }: { searchParams: any }) {
  const URL =
    endpoints.getPostByCategory + (searchParams?.cat ? searchParams.cat : "")
  const posts: PostCardPropType[] = await axios.get(URL).then(res => res.data)
  return (
    <main>
      <Posts posts={posts} />
    </main>
  )
}
