import { createSlice } from "@reduxjs/toolkit";


const initialState={isAuth:false,show:false,mode:'signin',token:''};



const authSlice=createSlice({
    name:'auth',
    
    initialState,
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
        },
        setToeken(state,action){
            state.token=action.payload.token
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;