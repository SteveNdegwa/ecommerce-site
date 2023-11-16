import {configureStore, createSlice} from "@reduxjs/toolkit"

export interface State{
    user: {
        value:{
            username: string
        }
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: {value:{username: null}},
    reducers:{
        login:(state, action)=>{
            state.value = action.payload
        },
        logout:(state)=>{
            state.value = {username: null}
        }
    }
})

export const { login, logout } = userSlice.actions;

export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
    },
})