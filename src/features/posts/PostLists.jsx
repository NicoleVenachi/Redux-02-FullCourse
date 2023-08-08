import { useSelector, useDispatch } from "react-redux";

import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";

import { useGetPostsQuery } from './postsSlice';

import PostsExcerpt from "./PostsExcerpt";

const PostLists = () => {

  const {
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsQuery()
  //saco todos los postts y su estado 

  //ahora, los organizamos
  const orderedPostIds = useSelector(selectPostIds)

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      {content}
    </section>
  )


}

export default PostLists
