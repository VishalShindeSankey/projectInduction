import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDishes = createAsyncThunk('dishes',async()=>{
    try{
        const res = await axios.get('http://172.16.0.67:3000/dishes');
        return res.data;
    }catch(err){
        console.log(err);
    }

})

export const deleteDishById = createAsyncThunk('dishes/DeleteById',async(dishId)=>{
    try{
        const res = await axios.delete(`http://172.16.0.67:3000/dishes/${dishId}`);
        return res.data;
    }catch(err){
        console.log(err);
    }
})

export const updateDishById = createAsyncThunk('dishes/updateById',async(data)=>{
    console.log("edit data",data);
    try{
        const res = await axios.put(`http://172.16.0.67:3000/dishes/${data.id}`,data);
        console.log("res after edit ",res.data);
        return res.data;
    }catch(err){
        console.log(err);
    }
})

export const addDish = createAsyncThunk('dishes/addDish',async(data)=>{
    try{
        const dishData = {...data,id:String(Date.now())}
        const res = await axios.post(`http://172.16.0.67:3000/dishes`,dishData);
        return res.data;
    }catch(err){
        console.log(err);
    }
});



const dishSlice = createSlice({
    name:'dish',
    initialState:[],
    reducers:{},
    extraReducers:(builder)=>{

        builder.addCase(fetchDishes.fulfilled,(state,action)=>{
            console.log("fetched data");
            return action.payload;
        });

        builder.addCase(deleteDishById.fulfilled,(state,action)=>{
            console.log("deleted data");
            return state.filter((item)=> item.id != action.payload.id);
        });

        builder.addCase(updateDishById.fulfilled,(state,action)=>{
            console.log("updated data");
            const index = state.findIndex((item)=>item.id == action.payload.id);
            state[index] = action.payload;
        });

        builder.addCase(addDish.fulfilled,(state,action)=>{
            console.log("added data");
            state.push(action.payload);
        });

    }
});

export default dishSlice.reducer;