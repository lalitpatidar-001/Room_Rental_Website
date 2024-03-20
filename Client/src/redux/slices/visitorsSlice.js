import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    visitors:[]
}

const visitorsSlice = createSlice({
    name:"visitors",
    initialState,
    reducers:{
        addAllVisitors:(state,action)=>{
            state.visitors = action.payload.data;
        },
        updateVisitor:(state,action)=>{
            state.visitors.push(action.payload.data);
        },
        deleteVisitor:(state,action)=>{
            const id = action.payload.data
            state.visitors = state.visitors.filter((item)=> item._id !== id);
        },
        
    }
});

export const {addAllVisitors,updateVisitor,deleteVisitor} = visitorsSlice.actions;

export default visitorsSlice.reducer;