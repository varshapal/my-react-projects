import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = { isAuthentication: false, token: null, forgotPwd: false };

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthentication = true;
      state.token = action.payload;
    
    },

    logout(state) {
      state.isAuthentication = false;
      state.token = null;
    },

    

    forgotPassword(state) {
      state.forgotPwd = true;
      console.log(state.forgotPwd);
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;