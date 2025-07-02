import { createSlice } from "@reduxjs/toolkit";

const mainteancesSlice = createSlice({
  name: "mainteance",
  initialState: {
    loading: false,
    success: false,
    error: null,
    mainteancesDetails: [],
    fetchMainteancesHistory:[],
    mainteanceAllHistory:[]
    
  },
  reducers: {
    //mainteances Request
    mainteanceRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    mainteancesSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.mainteancesDetails = action.payload.mainteancesDetails;
    },
    mainteancesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //fetch mainteances details
    fetchMaiteancesRequest: (state) => {
      state.loading = true;
    },
    fetchMainteancesSuccess: (state, action) => {
      state.loading = false;
      state.fetchMainteancesHistory = action.payload;
      
    },
    fetchMainteancesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
     //fetch mainteances All History
    fetchMaiteancesHistoryRequest: (state) => {
      state.loading = true;
    },
    fetchMainteancesHistorySuccess: (state, action) => {
      state.loading = false;
      state.mainteanceAllHistory = action.payload;
      
    },
    fetchMainteancesHistoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  mainteanceRequest,
  mainteancesSuccess,
  mainteancesFailure,
  fetchMaiteancesRequest,
  fetchMainteancesSuccess,
  fetchMainteancesFailure,
  fetchMaiteancesHistoryRequest,
  fetchMainteancesHistorySuccess,
  fetchMainteancesHistoryFailure
} = mainteancesSlice.actions;
export default mainteancesSlice.reducer;
