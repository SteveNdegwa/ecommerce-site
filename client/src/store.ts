import {configureStore, createSlice} from "@reduxjs/toolkit"

export interface State{
    user: {
        value:{
        }
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: {value:{}},
    reducers:{
        login:(state, action)=>{
            state.value = action.payload
        },
        logout:(state)=>{
            state.value = {}
        }
    }
})

export const { login, logout } = userSlice.actions;

export const store = configureStore({
    reducer:{
        user: userSlice.reducer,
    },
})