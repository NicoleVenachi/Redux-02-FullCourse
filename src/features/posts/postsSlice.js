import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from 'date-fns';

const initialState = [
  {
      id: '1',
      title: 'Learning Redux Toolkit',
      content: "I've heard good things.",
      date: sub(new Date(), { minutes: 10 }).toISOString(), //fecha de ahorita menos 10 min
      reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
      }
  },
  {
      id: '2',
      title: 'Slices...',
      content: "The more I say slice, the more I want pizza.",
      date: sub(new Date(), { minutes: 5 }).toISOString(),
      reactions: {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
      }
  }
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers:{
    postAdded:  { // agregar posts
      reducer(state, action) {
        state.push(action.payload)
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
      const existingPost = state.find(post => post.id === postId) //eneucntro post
      if (existingPost) {
          existingPost.reactions[reaction]++ //aumento las reacciones, para esa reaccion recibida
      }
  }



  }
})

//exporto el selector
export const selectAllPosts = (state) => state.posts

//exporto acciones
export const {postAdded, reactionAdded} = postSlice.actions

export default postSlice