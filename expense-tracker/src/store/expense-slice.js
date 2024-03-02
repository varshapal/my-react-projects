import { createSlice } from "@reduxjs/toolkit";


const initialExpenseState = { expenses: [], total: 0, showData: false };
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      
      state.expenses = [...state.expenses, action.payload];
      
      
      console.log("exp",state.total);
      
    },

    total(state, action) {
      state.total = state.total + action.payload;
      console.log("total", state.total);
    },
    showData(state) {
      state.showData = true;
    },
     
    
  },
});

export const expenseActions = expenseSlice.actions;


export default expenseSlice;