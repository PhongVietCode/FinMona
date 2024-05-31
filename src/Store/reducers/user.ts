import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export interface UserFullProps {
  id: string;
  email: string;
  avatar: string;
  name: string;
  token: string;
  password: string;
}
const initialState: UserFullProps = {
  id: "",
  email: "",
  avatar: "",
  name: "",
  token: "",
  password: "",
};
export const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setID: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setInfo: (state, action: PayloadAction<UserFullProps>) => {
      state.avatar = action.payload.avatar;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = state.token;
      state.password = state.password;
    },
  },
});

export const {
  setToken,
  setID,
  setAvatar,
  setEmail,
  setUserName,
  setPassword,
  setInfo
} = slice.actions;
export const userReducer = slice.reducer;
