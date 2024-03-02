import { createSlice } from "@reduxjs/toolkit";

const initialinboxState = { isComposemail: false, emails: [], totalUnreadMails: 0, selected: null };

const inboxSlice = createSlice({
  name: "inbox",
  initialState: initialinboxState,
  reducers: {
    
    openComposeMail(state) {
      state.isComposemail = true;
    },

    closeComposeMail(state) {
      state.isComposemail = false;
    },

    saveMailData(state, action) {
      state.emails = action.payload;
      state.totalUnreadMails = state.emails.filter(email => !email.read).length;
    },

    openSelectedMail(state, action) {
      state.selected = action.payload;
      state.totalUnreadMails = state.totalUnreadMails - 1;
      
    }
      
  
    }
  })


export const inboxActions = inboxSlice.actions;

export default inboxSlice;
