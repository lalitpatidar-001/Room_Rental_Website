import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    roomVisits:[]
}

const visitsSlice = createSlice({
    name:"room",
    initialState,
    reducers:{
        addAllVisits:(state,action)=>{
            state.roomVisits = action.payload.data;
        },
        updateVisit:(state,action)=>{
            state.roomVisits.push(action.payload.data);
        },
        deleteVisit:(state,action)=>{
            const id = action.payload.data
            state.roomVisits = state.roomVisits.filter((item)=> item._id !== id);
        },
        
    }
});

export const {addAllVisits,updateVisit,deleteVisit} = visitsSlice.actions;

export default visitsSlice.reducer;