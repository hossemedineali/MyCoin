import { createSlice } from "@reduxjs/toolkit";


const initialState={isAuth:false,show:false,mode:'signin',token:'',uid:'',isverified:false};



const authSlice=createSlice({
    name:'auth',
    
    initialState,
    reducers:{
        login(state,action){
            state.isAuth=true
           
        },
        logout(state){
            state.isAuth=false
        },
        setverified(state,action){
            state.isverified=action.payload.isverified
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
        },
        setuid(state,action){
            state.uid=action.payload.uid
        }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;