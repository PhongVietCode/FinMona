import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name:'notify',
    initialState: {badgeCount: 1},
    reducers: {
        setBadgeCount: (state, action:PayloadAction<number>) => {
            state.badgeCount = action.payload
        }
    }
})
export const {setBadgeCount} = slice.actions
export const notifiReducer = slice.reducer