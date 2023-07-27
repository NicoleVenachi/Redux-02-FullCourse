import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePostPage = () => {
    //ui para ver todo el post, no solo 100 carcteres

    //saco el router parameter
    const { postId } = useParams()

    //ahora no paso solo el state, sino tambien el id. Por eso la anonymous func
    const post = useSelector((state) => selectPostById(state, Number(postId)))

    if (!post) { //early return
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    return (
        <article>
            <h2>{post.title}</h2>
            
            {/* full post */}
            <p>{post.body}</p>

            <p className="postCredit"> 
                <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                <PostAuthor userId={post.userId} />
                <TimeAgo timestamp={post.date} />
            </p>
            <ReactionButtons post={post} />
        </article>
    )
}

export default SinglePostPage