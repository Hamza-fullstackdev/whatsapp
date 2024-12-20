import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
  onlineUsers: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
    },
    updateStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess(state) {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    logoutFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess(state) {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  logoutSuccess,
  logoutFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  setOnlineUsers
} = userSlice.actions;

export default userSlice.reducer;
