import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("authUser");
const storedToken = localStorage.getItem("authToken");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    authUser: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    error: null,
    success: false,
  },
  reducers: {
    //Register
    registerRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.authUser = action.payload.user;
      state.token = action.payload.token;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    //Login
    loginRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.authUser = action.payload.user;
      state.token = action.payload.token;

      //save to localStorage
      localStorage.setItem("authUser", JSON.stringify(action.payload.user));
      localStorage.setItem("authToken", action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.authUser = null;
      state.token = null;
      state.success = false;
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    },
    clearAuthStatus: (state) => {
      state.success = false;
      state.error = null;
    },

    //changePassword
    // changePasswordRequest: (state) => {
    //   state.loading = true;
    //   state.success = false;
    //   state.error = null;
    // },
    // changePasswordSuccess: (state, action) => {
    //   state.loading = false;
    //   state.success = true;
    //   state.message =
    //     action.payload?.message || "Password updated successfully";
    // },
    // changePasswordFailure: (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    //   state.success = false;
    // },
  },
});
export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
//   changePasswordRequest,
//   changePasswordSuccess,
//   changePasswordFailure,
  clearAuthStatus,
} = authSlice.actions;
export default authSlice.reducer;
