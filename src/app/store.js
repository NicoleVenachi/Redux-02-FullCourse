import {configureStore} from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice';

import usersSlice from '../features/users/usersSlice'

export const store = configureStore({
  reducer:{
    // counter: counterReducer,
    // posts: postSlice.reducer,
    users: usersSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})