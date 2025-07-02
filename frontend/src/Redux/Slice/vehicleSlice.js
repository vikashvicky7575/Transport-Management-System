import { createSlice } from '@reduxjs/toolkit';

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState: {
        loading: false,
        error: null,
        success: false,
        vehicle: []
    },
    reducers: {
        //addVehicle form input
        addVehicleRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        addVehicleSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.vehicle = action.payload.vehicle;
        },
        addVehicleFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //getVehicle show in vehiclelist
        fetchVehicleRequest: (state) => {
            state.loading = true
        },
        fetchVehicleSuccess: (state, action) => {
            state.loading = false;
            state.vehicle = action.payload
        },
        fetchVehicleFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        // updatedVehicle
        updateVehicleRequest: (state, action) => {
            const index = state.vehicle.findIndex((vehicle) => vehicle._id === action.payload._id);
            if (index !== -1) state.vehicle[index] = action.payload;
        }
    },
});

export const { addVehicleRequest, addVehicleSuccess, addVehicleFailure, fetchVehicleRequest, fetchVehicleFailure, fetchVehicleSuccess, updateVehicleRequest } = vehicleSlice.actions;
export default vehicleSlice.reducer;