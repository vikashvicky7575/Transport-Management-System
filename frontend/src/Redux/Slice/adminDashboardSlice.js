import {createSlice} from '@reduxjs/toolkit';

const adminDashboardSlice = createSlice({
    name:"adminDashBoard",
    initialState:{
        totalvehicles:[],
        totalDriver:[],
        activeTrips:[],
        bookingHistory:[],
        loading:false,
        error:null,
        
    },
    reducers:{
        fetchAdminDashboardRequest:(state)=>{
            state.loading=true;
            state.error = null;
        },
        fetchAdminDashboardSuccess:(state,action)=>{
            state.loading = false;
            state.totalvehicles = action.payload.totalvehicles;
            state.totalDriver = action.payload.totalDriver;
            state.activeTrips = action.payload.activeTrips;
            state.bookingHistory = action.payload.bookingHistory
        },
        fetchAdminDashboardFailure:(state,action)=>{

           state.loading = false;
           state.error = action.payload;
        },
    },
});

export const {fetchAdminDashboardRequest,fetchAdminDashboardSuccess,fetchAdminDashboardFailure} = adminDashboardSlice.actions;

export default adminDashboardSlice.reducer;