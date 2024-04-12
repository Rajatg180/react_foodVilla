// Here we are creating slice for our store

import { createSlice } from '@reduxjs/toolkit';

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[]
    },
    reducers:{
        addItem:(state,action)=>{
            // state is the current state which is present in cart at that time
            // action is data which we add to the cart
            state.items.push(action.payload);
        },
        removeItem:(state,action)=>{
            // state.items = state.items.filter(item => item !== action.payload);
            state.items.pop();
        },
        clearCart:(state)=>{
            state.items=[]; 
        }
    }
});

// Export the reducer
export default cartSlice.reducer;

// Export the actions
export const { addItem, removeItem, clearCart } = cartSlice.actions;