import { Home } from "./Home";
import React, { useState, useEffect, useId } from "react";
import { useLazyGetAllRecordsQuery } from "@/Services";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { SafeAreaView, Text } from "react-native";
import LottieView from "lottie-react-native";
import { Colors } from "@/Theme/Variables";

export const HomeContainer = () => {
  const [fetchRecords, { data, isLoading, isFetching }] =
    useLazyGetAllRecordsQuery();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    fetchRecords({ id: user.id })
      .unwrap()
      .then((fullfilled) => {})
      .catch((rejected) => {});
  }, [data]);

  return (
    <>
      {isLoading ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
          <LottieView
            autoPlay
            style={{
              backgroundColor: Colors.TRANSPARENT,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("../../../assets/anim/loading_anim.json")}
          />
        </SafeAreaView>
      ) : (
        <Home data={data} isLoading={isLoading} isFetching={isFetching} />
      )}
    </>
  );
};
