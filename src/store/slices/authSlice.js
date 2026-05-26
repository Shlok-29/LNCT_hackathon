import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  role: null, // 'user', 'admin', 'employee'
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
