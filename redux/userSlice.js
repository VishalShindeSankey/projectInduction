import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        userType:"user"
    },
    reducers:{
        addUserType:(state,action)=>{
            return {
                ...state,
                userType:action.payload
            }
        }
    }
})

export const {addUserType} = userSlice.actions;
export default userSlice.reducer;