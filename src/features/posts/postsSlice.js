import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

import { sub } from 'date-fns';
import axios from "axios";

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = { 
  //inicia como  array vacio los post, y estado inactivo, no hemos aun iniciado. Ojo que ahora es un object
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

//fetch de placeholder para post info
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

//vamos a escrbir nuevos posts. LE mando el post data
export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    postAdded:  { // agregar posts
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
          return {
              payload: {
                  id: nanoid(),
                  title,
                  content,
                  date: new Date().toISOString(), //alamaceno date en ISOString, fecha justa de creacion
                  userId, // agrego el userID
                  reactions: { //pongo las reacciones en 0.
                      thumbsUp: 0,
                      wow: 0,
                      heart: 0,
                      rocket: 0,
                      coffee: 0
                  }
              }
          }
      }
    },

    reactionAdded(state, action) {
      const { postId, reaction } = action.payload //saco post ID, y sus reaccion a cambiar
      const existingPost = state.posts.find(post => post.id === postId) //eneucntro post
      if (existingPost) {
          existingPost.reactions[reaction]++ //aumento las reacciones, para esa reaccion recibida
      }
  }



  },
  extraReducers(builder) {
    builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Adding date and reactions al initial state
            let min = 1;
            const loadedPosts = action.payload.map(post => {
                post.date = sub(new Date(), { minutes: min++ }).toISOString();
                post.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0
                }
                return post;
            });

            // Add any fetched posts to the array
            //agrego al arraY, cada post devuelto
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          //para gregar un nuevo post, primero lo agrega a la BD, luego ya hace algo
          //ese algo es agregarlo al esto
        
          //***** esta un poco ilogico esto, porque ya el action postaddded pierde sentido


            // Fix for API post IDs: LOS organizo porque no están ordenadas
            // Creating sortedPosts & assigning the id 
            // would be not be needed if the fake API 
            // returned accurate new post IDs
            const sortedPosts = state.posts.sort((a, b) => {
                if (a.id > b.id) return 1
                if (a.id < b.id) return -1
                return 0
            })
            action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
            // End fix for fake API post IDs 

            //convierto el payload al formato que nesito para agregrlo

            action.payload.userId = Number(action.payload.userId)
            action.payload.date = new Date().toISOString();
            action.payload.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
            console.log(action.payload)
            state.posts.push(action.payload)
        })
  }
})

//exporto el selector
export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

//exporto acciones
export const {postAdded, reactionAdded} = postSlice.actions

export default postSlice