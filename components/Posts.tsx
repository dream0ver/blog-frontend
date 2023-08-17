import PostCard from "@/components/PostCard"
import { PostCardPropType } from "@/util/types"

export default function Posts({ posts }: { posts: PostCardPropType[] }) {
  return (
    <div className="grid grid-cols-2 gap-10">
      {posts?.length ? (
        posts.map(post => (
          <PostCard
            key={post.id}
            {...post}
          />
        ))
      ) : (
        <h2 className="text-xl font-bold text-gray-500 mt-[25%]  text-center col-span-2">
          No posts available in this category.
        </h2>
      )}
    </div>
  )
}
