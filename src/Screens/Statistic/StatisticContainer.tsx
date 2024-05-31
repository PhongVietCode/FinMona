import React, { FunctionComponent, useEffect } from "react";
import { Statistic } from "./Statistic";
import { useLazyGetAllRecordsQuery } from "@/Services";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { SafeAreaView, Text } from "react-native";
import { Colors } from "@/Theme/Variables";
import LottieView from "lottie-react-native";

export const StatisticContainer: FunctionComponent = () => {
  const [fetchRecords, { data, isLoading, isFetching }] =
    useLazyGetAllRecordsQuery();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    try {
      fetchRecords({ id: user.id })
        .unwrap()
        .then((fullfilled) => {})
        .catch((rejected) => {});
      // console.log(data)
    } catch (error) {
      console.log(error);
    }
  }, [data]);
  return (
    <>
      {isFetching ? (
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
        <Statistic data={data || []}></Statistic>
      )}
    </>
  );
};
