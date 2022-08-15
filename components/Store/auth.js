import { createSlice } from "@reduxjs/toolkit";


const authSlice=createSlice({
    name:'auth',
    initialState:{isAuth:false,show:false,mode:'signin'},
    reducers:{
        login(state){
            state.isAuth=true
        },
        logout(state){
            state.isAuth=false
        },
        toggleshow(state){
            state.show=!state.show
        },
        togglemode(state){
            if(state.mode=='signin'){
                state.mode='signup'
            }else{
                state.mode='signin'
            }
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;