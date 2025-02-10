import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
      loading: false,
      user: null,
      error: null,  // ✅ Added error state
    },
    reducers: {
      // Set loading state
      setLoading: (state, action) => {
        state.loading = action.payload;
      },
  
      // Set authenticated user
      setAuthUser: (state, action) => {
        state.user = action.payload;
        state.error = null;  
      },
  
      // Set authentication error
      setAuthError: (state, action) => {
        state.error = action.payload;
        state.loading = false; 
      },
  
      // Logout user
      logoutUser: (state) => {
        state.user = null;
        state.error = null;
      }
    },
  });
  
  export const { setLoading, setAuthUser, setAuthError, logoutUser } = authSlice.actions;
  export default authSlice.reducer;
  