
import AddPostForm from "./features/posts/AddPostForm"
import PostLists from "./features/posts/PostLists"
// import Counter from "./features/counter/Counter"
// import './App.css'
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";
import Layout from "./components/Layout";


import { Routes, Route, Navigate } from 'react-router-dom';
import UsersList from "./features/users/UsersLists";
import UserPage from "./features/users/UserPage";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<PostLists />} />

        <Route path="post">
          {/* si me meto a los post veo todos por defecto, si clieckeo alguno, voy a el, puedo editarlo */}
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>

        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>

        {/* la catch all page, llega al home. El replace, reemplaza en el historial la address mala */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Route>
    </Routes>

  )
}

export default App
