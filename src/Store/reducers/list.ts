import {
  Transaction,
} from "@/Components/TransactionItem/TransactionItem";
import { createSlice } from "@reduxjs/toolkit";

interface TransactionState {
  transaclist: Transaction[];
}

const initialState: TransactionState = {
  transaclist: [],
};
const slice = createSlice({
  name: "transactionList",
  initialState: initialState,
  reducers: {},
});


export const recordReducer = slice.reducer;
