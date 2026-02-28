import { createSlice } from '@reduxjs/toolkit'; // Solo necesitas esto

const initialState = {
  currentUser: null,
  error: null,
  loading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // --- LOGIN ---
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // --- UPDATE (Esto es lo que te faltaba) ---
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // --- LOGOUT ---
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { signInStart, signInSuccess, signInFailure, updateStart, updateSuccess, updateFailure, signOutSuccess } = userSlice.actions;
export default userSlice.reducer;
