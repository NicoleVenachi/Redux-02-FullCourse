import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { fetchUsers } from './features/users/usersSlice';
import { fetchPosts } from './features/posts/postsSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//para el todolist
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./features/api/apiSlice";

store.dispatch(fetchUsers());
store.dispatch(fetchPosts()); //desde el principio traigo los posts

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>


  //para el todolist
  // <React.StrictMode>
  // <ApiProvider api={apiSlice}>
  //   <App />
  // </ApiProvider>
  // </React.StrictMode>

)
