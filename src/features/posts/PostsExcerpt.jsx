import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsExcerpt = ({ post }) => {
  //UI en la que saco contenido del post en 
  return (
    <article>
      <h3>{post.title}</h3>
      {/* no muestro todo el detail, colo primeas 100 caracteres/lineas */}
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}
export default PostsExcerpt