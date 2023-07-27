import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = { //map reactions look up object
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

const ReactionButtons = ({ post }) => {
  //ui para aumentar reacciones a un post
  const dispatch = useDispatch()


  // por cada emoji, hago un btn. Hago un map sobre key-value.//
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="reactionButton"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    )
  })

  //return de todos los btns
  return <div>{reactionButtons}</div>
}
export default ReactionButtons