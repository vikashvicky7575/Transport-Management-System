import { createSlice } from '@reduxjs/toolkit'

const driverSlice = createSlice({
    name: 'driver',
    initialState: {
        loading: false,
        success: false,
        error: null,
        driverData: [],
        uniqueErrors: {},
    },
    reducers: {
        //addDriverRequest
        addDriverRequest: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        addDriverSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.driverData = action.payload.driverData
        },
        addDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        //getDriverDetails_Request
        fetchDriverRequest: (state) => {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        fetchDriverSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.driverData = action.payload.data;
        },
        fetchDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        //uniqueField
        checkFieldUnique: (state, action) => { },
        setUniqueError: (state, action) => {
            const { field, error } = action.payload;
            if (error) {
                state.uniqueErrors[field] = error;
            } else {
                delete state.uniqueErrors[field]; // remove field error if empty
            }
        },
        clearUniqueErrors: (state) => {
            state.uniqueErrors = {};
        },
    },
});

export const { addDriverRequest, addDriverSuccess, addDriverFailure, fetchDriverRequest, fetchDriverSuccess, fetchDriverFailure, checkFieldUnique, setUniqueError, clearUniqueErrors } = driverSlice.actions;
export default driverSlice.reducer;