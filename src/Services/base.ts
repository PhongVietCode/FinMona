import { TransactionProps } from "@/Components/TransactionItem/TransactionItem";
import { Config } from "@/Config";
import { BaseQueryApi } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

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


export const record_api = createApi({
  reducerPath: 'record_api',
  baseQuery: fetchBaseQuery({baseUrl: Config.MY_URL}),
  endpoints: () => ({})
})

export const user_api = createApi({
  reducerPath: "user_api",
  baseQuery: baseQueryWithInterceptor,
  endpoints: () => ({}),
});
