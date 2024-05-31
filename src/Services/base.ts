import { userReducer } from "./../Store/reducers/user";
import { Transaction } from "@/Components/TransactionItem/TransactionItem";
import { Config } from "@/Config";
import { RootState } from "@/Store";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { AppState } from "react-native";

const baseQuery = fetchBaseQuery({ baseUrl: Config.API_URL });

const baseQueryWithInterceptor = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {}
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result;
};

export const RECORD_API = createApi({
  reducerPath: "RECORD_API",
  tagTypes: ["Records"], // dinh danh nhung kieu tag cho phep dung, ep goi API lai
  baseQuery: fetchBaseQuery({
    baseUrl: Config.MY_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const TAG_API = createApi({
  reducerPath: "TAG_API",
  tagTypes: ["Tags"], // dinh danh nhung kieu tag cho phep dung, ep goi API lai
  baseQuery: fetchBaseQuery({
    baseUrl: Config.MY_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const API = createApi({
  reducerPath: "API",
  tagTypes: ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: Config.MY_URL,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.user.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
