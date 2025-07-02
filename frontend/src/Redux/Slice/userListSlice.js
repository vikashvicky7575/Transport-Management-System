import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userList",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchUsersByRoleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserByRoleSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUserByRoleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchUsersByRoleRequest,
  fetchUserByRoleSuccess,
  fetchUserByRoleFailure,
} = userSlice.actions;

export default userSlice.reducer;
