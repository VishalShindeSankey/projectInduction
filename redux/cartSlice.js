import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'dishes',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            state.push(action.payload);
        },
        incrementCounter:(state,action)=>{
            const currItem = state.find((item)=>item.id == action.payload);
            currItem.quantity = currItem.quantity+1;
        },
        decrementCounter:(state,action)=>{
            const currItem= state.find((item)=>item.id == action.payload);
            currItem.quantity = currItem.quantity > 0 ? currItem.quantity - 1:0;
            if(currItem.quantity == 0){
                const index = state.findIndex((item)=>item.id == action.payload);
                state.splice(index,1);
            }
        },
        clearCart:(state)=>{
            return [];
        }
    }
});

export const {addToCart,incrementCounter,decrementCounter,clearCart} = cartSlice.actions;
export default cartSlice.reducer;