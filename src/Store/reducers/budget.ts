import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "budget",
  initialState: { limitBudget: "0", isOverLimt: false, currencyType: 'VND'},
  reducers: {
    setLimitBudget: (state, action: PayloadAction<string>) => {
      state.limitBudget = action.payload;
    },
    setCurrencyType: (state, action: PayloadAction<string>) => {
      state.currencyType = action.payload;
    },
    checkOverLimit: (state, {payload: {totalAmount}}) => {
        state.isOverLimt = totalAmount > state.limitBudget
    }
  },
});
export const {setLimitBudget, checkOverLimit, setCurrencyType} = slice.actions
export const budgetReducer = slice.reducer 