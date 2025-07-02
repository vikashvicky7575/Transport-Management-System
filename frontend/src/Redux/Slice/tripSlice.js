import { createSlice } from "@reduxjs/toolkit";

const tripSlice = createSlice({
  name: "trip",
  initialState: {
    vehicles: [],
    drivers: [],
    vehiclesOnTrip: [],
    tripAllDetails: [],
    loading: false,
    error: null,
    fetched: false,
    statusUpdating: false,
    statusUpdateError: null,
    success: false,
    lastCreatedTrip: null,
  },
  reducers: {
    //create trip
    createTripStart: (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    createTripSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.lastCreatedTrip = action.payload;
    },
    createTripFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //fetch trip all details
    fetchtripHistoryStart: (state) => {
      state.loading = true;
    },

    fetchtripHistorySuccess: (state, action) => {
      state.tripAllDetails = action.payload;
      state.loading = false;
      state.fetched = true;
    },
    fetchtripHistoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.fetched = false;
    },

    //fetch driver vehicle in another collection
    fetchAvailableStart: (state) => {
      state.loading = true;
    },
    fetchAvailableSuccess: (state, action) => {
      state.vehicles = action.payload.vehicles;
      state.drivers = action.payload.drivers;
      state.loading = false;
    },
    fetchAvailableFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //fetch onTrip vehicleRoutes
    fetchVehiclesOnTripStart: (state) => {
      state.loading = true;
    },
    fetchVehiclesOnTripSuccess: (state, action) => {
      state.vehiclesOnTrip = action.payload;
      state.loading = false;
    },
    fetchVehiclesOnTripFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    //upDate onTrip vehicleRoutes
    updateTripStatusStart: (state) => {
      state.statusUpdating = true;
      state.statusUpdateError = null;
    },
    // updateTripStatusSuccess: (state, action) => {
    //   const updatedTrip = action.payload;
    //   const index = state.vehiclesOnTrip.findIndex(
    //     (trip) => trip.tripId === updatedTrip.tripId
    //   );
    //   if (index !== -1) {
    //     state.vehiclesOnTrip[index] = updatedTrip;
    //   }
    //   state.statusUpdating = false;
    //   state.statusUpdateError = null;
    // },
    updateTripStatusSuccess: (state, action) => {
      const { tripId, status } = action.payload;

      // Remove trip from list if completed or cancelled
      if (status === "Completed" || status === "Cancelled") {
        state.vehiclesOnTrip = state.vehiclesOnTrip.filter(
          (trip) => trip.tripId !== tripId
        );
      } else {
        // Or just update status if you prefer keeping it
        const index = state.vehiclesOnTrip.findIndex(
          (trip) => trip.tripId === tripId
        );
        if (index !== -1) {
          state.vehiclesOnTrip[index].status = status;
        }
      }

      state.statusUpdating = false;
      state.statusUpdateError = null;
    },

    updateTripStatusFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchAvailableStart,
  fetchAvailableSuccess,
  fetchAvailableFail,
  createTripStart,
  createTripSuccess,
  createTripFail,
  fetchtripHistoryStart,
  fetchtripHistorySuccess,
  fetchtripHistoryFailure,
  fetchVehiclesOnTripStart,
  fetchVehiclesOnTripSuccess,
  fetchVehiclesOnTripFailure,
  updateTripStatusStart,
  updateTripStatusSuccess,
  updateTripStatusFailure,
} = tripSlice.actions;

export default tripSlice.reducer;
