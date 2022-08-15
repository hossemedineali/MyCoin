import { configureStore,createSlice } from "@reduxjs/toolkit";

const currencySlice=createSlice({
    name:'currency',
    initialState:{currency:'usd'},
    reducers:{
        changecurrency(state,action){
            state.currency = action.payload
        }
    }
})

export const currencyActio=currencySlice.actions;

export default currencySlice.reducer;