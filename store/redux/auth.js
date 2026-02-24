import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload?.token ?? null;
      state.user = action.payload?.user ?? null;
      state.error = null;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    setUserColorCustomization: (state, action) => {
      if (state.user) {
        state.user.Color_Customization = action.payload;
      }
    },
  },
});

export const { login, logout, setUserColorCustomization } = authSlice.actions;

export default authSlice.reducer;
