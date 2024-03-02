import { configureStore } from "@reduxjs/toolkit";


import authSlice from "./auth-slice";

import inboxSlice from "./inbox-slice";

const store = configureStore({
    reducer: {auth: authSlice.reducer, inbox: inboxSlice.reducer }
})

export default store;