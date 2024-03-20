import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    filteredRooms:[],
    myRooms:[]
}

const roomSlice = createSlice({
    name:"room",
    initialState,
    reducers:{
        addAllRooms:(state,action)=>{
            state.filteredRooms = action.payload.data;
        },
        updateRoom:(state,action)=>{
            state.filteredRooms.push(action.payload.data);
        },
        deleteRoom:(state,action)=>{
            const id = action.payload.data
            console.log("id in store",id)
            state.filteredRooms = state.filteredRooms.filter((item)=> item._id !== id);
        },

        addAllMyRooms:(state,action)=>{
            state.myRooms = action.payload.data;
        },
        updateMyRoom:(state,action)=>{
            state.myRooms.push(action.payload.data);
        },
        deleteMyRoom:(state,action)=>{
            const id = action.payload.data
            console.log("id in store",id)
            state.myRooms = state.myRooms.filter((item)=> item._id !== id);
        },
        
    }
});

export const {addAllRooms,updateRoom,deleteRoom,
    addAllMyRooms,
    updateMyRoom,
    deleteMyRoom
} = roomSlice.actions;

export default roomSlice.reducer;