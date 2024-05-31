import AsyncStorage from "@react-native-async-storage/async-storage";
import { RECORD_API } from "../base";
import { Transaction } from "@/Components/TransactionItem/TransactionItem";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";

export const getTokenFromLocalStorage = async () => {
  await AsyncStorage.getItem("token").then((value: any) => {
    return value;
  });
  // return user.token;
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
        body: JSON.stringify(data.body),
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Records", id: data.id },
      ],
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
        body: JSON.stringify(data.body),
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Records", id: "LIST" },
      ],
    }),
    deleteRecord: build.mutation<string, { idReport: string }>({
      query: (data) => ({
        url: `records/${data.idReport}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }),
      invalidatesTags: (result, error, data) => [
        { type: "Records", id: data.idReport },
      ],
    }),
    getRecordByTimeRange: build.query<
      Transaction[],
      { id: string; startDate: string; endDate: string }
    >({
      query: (data) => ({
        url: `records/${data.id}/getRecordByTime`,
        method: "GET",
        params: { startDate: data.startDate, endDate: data.endDate },
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
    getRecordByDate: build.query<Transaction[], { id: string; date: string }>({
      query: (data) => ({
        url: `records/${data.id}/getRecordByDate`,
        params: { date: data.date },
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
    getRecordByCategory: build.query<
      Transaction[],
      { id: string; categoryName: string }
    >({
      query: (data) => ({
        url: `records/${data.id}/getRecordByCategory`,
        params: { categoryName: data.categoryName },
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
    getRecordByMoneySource: build.query<
      Transaction[],
      { id: string; moneySourceName: string }
    >({
      query: (data) => ({
        url: `records/${data.id}/getRecordByMoneySource`,
        params: { moneySourceName: data.moneySourceName },
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
  }),
  overrideExisting: true,
});
export const {
  useLazyGetAllRecordsQuery,
  useAddRecordMutation,
  useEditRecordMutation,
  useDeleteRecordMutation,
  useLazyGetRecordByTimeRangeQuery,
  useLazyGetRecordByDateQuery,
  useLazyGetRecordByCategoryQuery,
  useLazyGetRecordByMoneySourceQuery,
} = recordApi;
