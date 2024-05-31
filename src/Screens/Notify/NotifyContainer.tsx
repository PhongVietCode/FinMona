import React, { FunctionComponent, useEffect } from "react";
import { Notify } from "./Notify";
import { useDispatch } from "react-redux";
import { setBadgeCount } from "@/Store/reducers";

export const NotifyContainer: FunctionComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBadgeCount(0));
  });
  return <Notify></Notify>;
};
