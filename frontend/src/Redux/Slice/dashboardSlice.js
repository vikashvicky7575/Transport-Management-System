import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    onTripVehicles: [],
    availableDrivers: [],
    availableVehicles: [],
    maintenanceVehicles: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchDashboardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardSuccess: (state, action) => {
      state.loading = false;
      state.onTripVehicles = action.payload.onTripVehicles;
      state.availableVehicles = action.payload.availableVehicles;
      state.availableDrivers = action.payload.availableDrivers;
      state.maintenanceVehicles = action.payload.maintenanceVehicles;
    },
    fetchDashboardFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
