import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";

const AddPostForm = () => {
  //puedo sacar tambien ele stado
  const [addNewPost, { isLoading }] = useAddNewPostMutation()


  //
  const navigate = useNavigate()

  //temp state
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  //
  const users = useSelector(selectAllUsers)

  //handle events
  const onTitleChanged = e => setTitle(e.target.value)
  const onContentChanged = e => setContent(e.target.value)
  const onAuthorChanged = e => setUserId(e.target.value)

  //verifico si puedo o no guarar post, sino puedo, deshabilito boton
  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  //si tengo info, mando a crear post en estado globar, y reiinicio UI
  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        await addNewPost({ title, body: content, userId }).unwrap()

        setTitle('')
        setContent('')
        setUserId('')
        navigate('/')
      } catch (err) {
        console.error('Failed to save the post', err)
      }
    }
  }



  const usersOptions = users.map(user => (
    // options pero no hardcodeadas, creadas con codigo
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        {/* aqui, usuario elige cual es su user para postear */}
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button
          type="button"
          onClick={onSavePostClicked}
          disabled={!canSave}
        >Save Post</button>
      </form>
    </section>
  )
}
export default AddPostForm
