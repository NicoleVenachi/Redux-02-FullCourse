import { useSelector } from 'react-redux'
import { selectAllPosts } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './RectionButtons'

const PostLists = () => {
  //saco todos los postts
  const posts = useSelector(selectAllPosts)

  // ordeno posts segun fecha. Ordena por pares
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  console.log("🚀 ~ file: PostLists.jsx:11 ~ PostLists ~ orderedPosts:", orderedPosts)

  const renderedPosts = orderedPosts.map(post => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content.substring(0, 100)}</p>

      <p className="postCredit">
        {/* muestro cierta info en string */}
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  ))

  return (
    <section>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )


}

export default PostLists
