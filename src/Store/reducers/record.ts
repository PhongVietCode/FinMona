import { Transaction } from "@/Components/TransactionItem/TransactionItem";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  record: {
    id: "",
    isIncome: true,
    amount: 0,
    category: "",
    moneySource: "",
    dateCreated: "",
    user: "",
    description: "",
  },
  // budgetLimit: ""
};
const slice = createSlice({
  name: "editRecord",
  initialState: initialState,
  reducers: {
    setEditRecord: (state, action: PayloadAction<Transaction>) => {
      state.record = action.payload;
    },
  },
});

export const {setEditRecord} = slice.actions
export const editRecordReducer = slice.reducer;
