import { useSelector, useDispatch } from "react-redux";

import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";

import PostsExcerpt from "./PostsExcerpt";

const PostLists = () => {
  //saco todos los postts y su estado 

  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  //async code, si trajera desde aqui la data

  // useEffect(() => {
  //   //sino está activo, hago peticion
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts())
  //   }
  // }, [postStatus, dispatch])

  // ordeno posts segun fecha. Ordena por pares


  let content;
  if (postStatus === 'loading') {
    content = <p> "Loading..." </p>;
  }
  else if (postStatus === 'succeeded') {
    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPosts.map(post => <PostsExcerpt key={post.id} post={post} />)
  }
  else if (postStatus === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      {content}
    </section>
  )


}

export default PostLists
