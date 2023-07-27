import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';


// creo el estado con la entidad users, apra asignarla a los posts
// los users los traigo del fetch a la api
const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
            //esta accion solo hace el fetch, y devuevle el payload/rta que le mande la api
            //OJO, haciendo este return, reescribre directamente todo el estado
        })
    }
})

export const selectAllUsers = (state) => state.users;

export default usersSlice