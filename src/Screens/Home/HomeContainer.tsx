import { Home } from "./Home";
import React, { useState, useEffect, useId } from "react";
import { getIDFromLocalStorage, useLazyGetAllRecordsQuery, useLazyGetAllUserQuery, useLazyGetUserQuery } from "@/Services";

export const HomeContainer = () => {
  const [fetchRecords,{data, isLoading, isFetching}] = useLazyGetAllRecordsQuery()

  useEffect(() => {
    fetchRecords({id: getIDFromLocalStorage()});
  }, [data]);

  return <Home data={data} isLoading={isLoading} isFetching={isFetching} />;
};
