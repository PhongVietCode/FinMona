import { RECORD_API } from "../base";
import { Transaction } from "@/Components/TransactionItem/TransactionItem";

export const getTokenFromLocalStorage = () => {
  // fake get token from local storage
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTBjMzFlYjM3NzliN2JhMGY0NDRjNyIsImlhdCI6MTcxNjU2ODg4MSwiZXhwIjoxNzE2ODI4MDgxfQ.v0EPFKuPa4AeNdiM39eOJkdoYdke7gkjvqvgrn39Rr0";
};
export const getIDFromLocalStorage = () => {
  // fake get ID from local storage
  return "6650c31eb3779b7ba0f444c7";
};
const recordApi = RECORD_API.injectEndpoints({
  endpoints: (build) => ({
    getAllRecords: build.query<Transaction[], { id: string }>({
      query: (data) => ({
        url: `records/${data.id}/getRecord`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: "Records" as const, id })),
            { type: "Records" as const, id: "LIST" },
          ];
          return final;
        }
        const final = [{ type: "Records" as const, id: "LIST" }];
        return final;
      },
    }),
    editRecord: build.mutation<
      string,
      { id: string; body: Omit<Transaction, "id" | "dateCreated" | "user"> }
    >({
      query: (data) => ({
        url: `records/${data.id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body: data.body,
      }),
    }),
    addRecord: build.mutation<
      string,
      { id: string; body: Omit<Transaction, "id" | "dateCreated" | "user"> }
    >({
      query: (data) => ({
        url: `records/${data.id}/createRecord`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
        body: data.body,
      }),
      invalidatesTags: (result, error, data) => [{type: "Records", id: "LIST"}]
    }),
    deleteRecord: build.mutation<string, { idReport: string }>({
      query: (data) => ({
        url: `records/${data.idReport}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
    }),
  }),
  overrideExisting: true,
});
export const {
  useLazyGetAllRecordsQuery,
  useAddRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
} = recordApi;
