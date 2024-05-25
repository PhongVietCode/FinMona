import { record_api } from "../base";
import { TransactionProps } from "@/Components/TransactionItem/TransactionItem";

export const getTokenFromLocalStorage = () => {
  // fake get token from local storage
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTBjMzFlYjM3NzliN2JhMGY0NDRjNyIsImlhdCI6MTcxNjU2ODg4MSwiZXhwIjoxNzE2ODI4MDgxfQ.v0EPFKuPa4AeNdiM39eOJkdoYdke7gkjvqvgrn39Rr0";
};
export const getIDFromLocalStorage = () => {
    // fake get ID from local storage
    return "6650c31eb3779b7ba0f444c7"
  };
const recordApi = record_api.injectEndpoints({
  endpoints: (build) => ({
    getAllRecords: build.query<TransactionProps[], void>({
      query: () => ({
        url: `records/${getIDFromLocalStorage()}/getRecord`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    }),
    default: build.query<string, void>({
        query: () => ''
    })
  }),
  overrideExisting: true,
});
export const { useGetAllRecordsQuery, useDefaultQuery } = recordApi;
