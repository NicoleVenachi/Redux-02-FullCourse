import {configureStore} from '@reduxjs/toolkit'
import postSlice from '../features/posts/postsSlice'
import usersSlice from '../features/users/usersSlice'
// import counterReducer from '../features/counter/counterSlice'


export const store = configureStore({
  reducer:{
    // counter: counterReducer,
    posts: postSlice.reducer,
    users: usersSlice.reducer
  }
})