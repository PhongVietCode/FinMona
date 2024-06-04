import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
} from "react-native";
import ArrowUp from "../../../assets/icons/arrow-up-circle.svg";
import * as Sentry from "@sentry/react-native";
import EyeShow from "../../../assets/icons/eye-alt.svg";
import Search from "../../../assets/icons/search-alt.svg";
import { Colors, FontSize } from "@/Theme/Variables";
import { Header } from "@/Components/Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyles } from "@/Theme";
import { LineChart } from "react-native-chart-kit";
import EyeSlash from "../../../assets/icons/eye-slash.svg";
import { MotiScrollView } from "moti";
import { Skeleton } from "moti/skeleton";

import {
  TransactionItem,
  Transaction,
  moneyConvert,
} from "@/Components/TransactionItem/TransactionItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import {
  useLazyGetAllRecordsQuery,
  useLazyGetRecordByDateQuery,
  useLazyGetRecordByTimeRangeQuery,
} from "@/Services";
import LottieView from "lottie-react-native";
import LoadIcon from "../../../assets/icons/load.svg";
import EmptyIcon from "../../../assets/icons/empty.svg";

export interface HomeProps {
  data: Transaction[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}
export const Home = (props: HomeProps) => {
  const [listRecord, setListRecord] = useState<Transaction[]>([]);
  const [fetchRecords] = useLazyGetAllRecordsQuery();
  const userImg = require("../../../assets/my_img.jpg");
  const [balance, setBalance] = useState("3.000.000");
  const calculateBalance = () => {
    let total = 0;
    props.data?.map((item) => {
      if (item.isIncome == true) {
        total += item.amount;
      }
    });
    setBalance(moneyConvert(total));
  };
  const [showBalance, setShowBalance] = useState(false);
  const viewOptions = ["Day", "Week", "Month", "Year"];
  const [selectedTab, setSelectedTab] = useState(viewOptions[0]);
  const [fetchRecordByTimeRange] = useLazyGetRecordByTimeRangeQuery();
  const [fetchRecordByDate] = useLazyGetRecordByDateQuery();

  const [loadGraph, setLoadGraph] = useState(false);
  const date = new Date(Date.now());
  // const [recordList, setRecordList] = useState(record_list);

  const [graphData, setGraphList] = useState({
    day: [0, 0, 0, 0, 0, 0, 0],
    week: [0, 0, 0, 0],
    month: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    year: [0, 0, 0, 0],
  });
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const dateInWeek = date.getUTCDay();
  const month = date.getMonth() + 1;
  let startMonth = month;
  let endMonth = month;
  const today = date.getDate();
  let startOfWeek = today - dateInWeek + 1 - 1;
  let endOfWeek = today + (7 - dateInWeek) + 1;
  if (startOfWeek <= 0) {
    startOfWeek = daysInMonth[month] + startOfWeek;
    startMonth -= 1;
  }
  if (endOfWeek > daysInMonth[month]) {
    endOfWeek = endOfWeek - daysInMonth[month];
    endMonth += 1;
  }
  const initialGraphData = [
    {
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: graphData.day,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 5, // optional
          strokeColor: Colors.PRIMARY,
        },
      ],

      // legend: ["Your spending"], // optional
    },
    {
      labels: ["First", "Second", "Third", "Fourth"],
      datasets: [
        {
          data: graphData.week,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 5, // optional
          strokeColor: Colors.PRIMARY,
        },
      ],
      // legend: ["Your spending"], // optional
    },
    {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          data: graphData.month,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 5, // optional
          strokeColor: Colors.PRIMARY,
        },
      ],
      // legend: ["Your spending"], // optional
    },
    {
      labels: ["2021", "2022", "2023", "2024"],
      datasets: [
        {
          data: graphData.year,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 5, // optional
          strokeColor: Colors.PRIMARY,
        },
      ],
      // legend: ["Your spending"], // optional
    },
  ];

  const refreshData = async () => {
    if (selectedTab == viewOptions[0]) {
      await getTotalAmountByDay();
    } else if (selectedTab == viewOptions[1]) {
      await getTotalAmountByWeek();
    }
    calculateBalance();
  };
  const getTotalAmountByDay = async () => {
    let data = [0, 0, 0, 0, 0, 0, 0];
    setLoadGraph(true);
    await fetchRecordByTimeRange({
      id: user.id,
      startDate: `${startOfWeek}-${startMonth}-${date.getFullYear()}`,
      endDate: `${endOfWeek}-${endMonth}-${date.getFullYear()}`,
    })
      .unwrap()
      .then((fullfilled: Transaction[]) => {
        console.log(startOfWeek)
        let date = startOfWeek + 1;
        for (let i = 0; i < 7; i++) {
          if (date > daysInMonth[month]) {
            date = 1;
          }
          data[i] = fullfilled.filter(
            (item) =>
              item.dateCreated.split("-")[0] ==
              (date < 10 ? `0${date}` : `${date}`)
          ).length;
          date++;
        }
        setGraphList({ ...graphData, day: data });
        setListRecord(fullfilled);
      })
      .catch((rejected: any) => {
        Sentry.captureException(rejected);
      });
    setLoadGraph(false);
  };
  const getTotalAmountByWeek = async () => {
    let data = [0, 0, 0, 0];
    setLoadGraph(true);
    console.log(month);
    await fetchRecordByTimeRange({
      id: user.id,
      startDate: `01-0${month}-${date.getFullYear()}`,
      endDate: `${31}-0${month}-${date.getFullYear()}`,
    })
      .unwrap()
      .then((fullfilled: Transaction[]) => {
        let date = 1;
        let upperBound = date + 6;
        for (let i = 0; i < data.length; i++) {
          data[i] = fullfilled.filter(
            (item) =>
              Number(item.dateCreated.split("-")[0]) >= date &&
              Number(item.dateCreated.split("-")[0]) <= upperBound
          ).length;
          date += 7;
          upperBound = date + 6;
          if (date >= 21) {
            upperBound = daysInMonth[month];
          }
        }
        setGraphList({ ...graphData, week: data });
        setListRecord(fullfilled);
      })
      .catch((rejected) => {});
    setLoadGraph(false);
  };
  const getTotalAmountByMonth = () => {};
  const getTotalAmountByYear = () => {};

  useEffect(() => {}, [selectedTab]);

  const [dataShown, setDataShown] = useState(initialGraphData[0]);

  const chartConfig = {
    backgroundColor: Colors.WHITE,
    backgroundGradientFrom: Colors.WHITE,
    backgroundGradientTo: Colors.BACKGROUND,
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(81, 110, 252, ${opacity})`,
    labelColor: (opacity = 1) => Colors.TEXT_BOLD,
    style: {
      borderRadius: 100,
    },
    barPercentage: 0.5,
    propsForDots: {
      r: "3",
      strokeWidth: "1",
      stroke: Colors.BUTTON,
    },
  };

  const [expanded, setExpanded] = useState(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // animated
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  }, []);
  useEffect(() => {
    getTotalAmountByDay();
    calculateBalance();
  }, []);
  useEffect(() => {
    opacity.value = 0;
    scale.value = 0;
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withSpring(1, { duration: 400 });
    refreshData();
  }, [selectedTab]);

  const rotate = useSharedValue(0);
  const scaleGraph = useSharedValue(1);
  const expandedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleGraph.value }],
    };
  });
  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotate.value}deg` }],
    };
  }, []);
  useEffect(() => {
    if (expanded) {
      rotate.value = withTiming(180, { duration: 100 });
      scaleGraph.value = withTiming(1, { duration: 400 });
    } else {
      rotate.value = withTiming(0, { duration: 200 });
      scaleGraph.value = withTiming(0, { duration: 100 });
    }
  }, [expanded]);

  useEffect(() => {
    refreshData();
  }, [props.data]);

  const user = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={
          <View
            style={[
              styles.center,
              { flexDirection: "column", alignItems: "flex-start", flex: 1 },
            ]}
          >
            <Text
              style={[
                gStyles.title1,
                { color: Colors.WARN, fontWeight: "800" },
              ]}
            >
              Welcome,{" "}
            </Text>
            <Text
              style={[
                gStyles.title1,
                { color: Colors.TEXT_BOLD, fontWeight: "700" },
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {user.name}
            </Text>
          </View>
        }
        right={
          <View
            style={{
              width: 50,
              aspectRatio: 1,
              borderRadius: 50,
              overflow: "hidden",
              shadowColor: Colors.LIGHT_GRAY,
              elevation: 1,
            }}
          >
            <ImageBackground
              source={{
                uri: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              resizeMode="cover"
              style={{ flex: 1, width: "100%", transform: [{ scale: 1.2 }] }}
            />
          </View>
        }
        center={null}
      />
      <ScrollView style={styles.body}>
        {/* ========= */}
        <View style={[styles.center, { flexDirection: "column" }]}>
          <Text
            style={[
              gStyles.regular2,
              { fontSize: 17, color: Colors.LIGHT_GRAY, fontWeight: "400" },
            ]}
          >
            Total Income
          </Text>
          <Pressable
            onPress={() => {
              setShowBalance(!showBalance);
            }}
            style={[styles.center, { gap: 10 }]}
          >
            <Text
              style={[
                gStyles.title1,
                { fontWeight: "600", fontSize: FontSize.HUGE },
              ]}
            >
              {showBalance ? `${balance}` : "*********"}
            </Text>
            {showBalance ? (
              <EyeShow fill={Colors.TEXT_BOLD} />
            ) : (
              <EyeSlash fill={Colors.TEXT_BOLD} />
            )}
          </Pressable>
        </View>
        {/* ========= */}
        <View style={{ paddingVertical: 5 }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={[
                gStyles.title2,
                { fontSize: 18, alignSelf: "flex-start", fontWeight: "700" },
              ]}
            >
              Spend Recording:{" "}
            </Text>
            <Animated.View style={[rotationStyle]}>
              <Pressable onPress={() => setExpanded(!expanded)}>
                <ArrowUp fill={Colors.TEXT_BOLD} />
              </Pressable>
            </Animated.View>
          </View>
          {expanded ? (
            <Animated.View
              style={[
                { marginTop: 18, width: "100%" },
                reanimatedStyle,
                expandedStyle,
              ]}
            >
              {loadGraph && props.isFetching ? (
                <LottieView
                  autoPlay
                  style={{
                    height: 200,
                    alignSelf: "center",
                    backgroundColor: Colors.TRANSPARENT,
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require("../../../assets/anim/loading_anim2.json")}
                />
              ) : (
                <LineChart
                  width={Dimensions.get("window").width - 52}
                  data={dataShown}
                  height={200}
                  chartConfig={chartConfig}
                  bezier
                />
              )}
            </Animated.View>
          ) : (
            <></>
          )}
        </View>
        <View style={{ width: "100%", marginVertical: 12 }}>
          <FlatList
            style={{
              backgroundColor: Colors.TEXT_LIGHT,
              alignSelf: "center",
              padding: 5,
              borderRadius: 14,
            }}
            data={viewOptions}
            horizontal
            scrollEnabled={true}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setDataShown(initialGraphData[index]);
                  setSelectedTab(item);
                }}
                style={[
                  styles.tabStyle,
                  {
                    backgroundColor:
                      selectedTab === item ? Colors.PRIMARY : Colors.WHITE,
                    borderTopLeftRadius: index == 0 ? 10 : 0,
                    borderBottomLeftRadius: index == 0 ? 10 : 0,
                    borderTopRightRadius:
                      index == viewOptions.length - 1 ? 10 : 0,
                    borderBottomRightRadius:
                      index == viewOptions.length - 1 ? 10 : 0,
                    flexGrow: 1,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabTextStyle,
                    {
                      color:
                        selectedTab === item ? Colors.WHITE : Colors.TEXT_BOLD,
                      fontWeight: "700",
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
        </View>
        <View
          style={[
            styles.center,
            {
              width: "100%",
              justifyContent: "space-between",
              marginBottom: 8,
            },
          ]}
        >
          <Text style={[gStyles.title2, { fontSize: 18, fontWeight: "700" }]}>
            Transactions:{" "}
          </Text>
          <Pressable
            onPress={() => {
              refreshData();
            }}
          >
            <LoadIcon fill={Colors.TEXT_BOLD} width={28} height={28} />
          </Pressable>
        </View>
        {loadGraph ? (
          <MotiScrollView
            contentContainerStyle={{ gap: 10 }}
            transition={{ type: "timing" }}
            from={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {[...Array(4).keys()].map((i) => (
              <Skeleton
                colorMode={"light"}
                width={"100%"}
                height={70}
                radius={12}
                key={i}
              />
            ))}
          </MotiScrollView>
        ) : (
          <View>
            {props.data?.length == 0 ? (
              <View style={{ alignItems: "center", paddingVertical: 5 }}>
                <EmptyIcon
                  stroke={Colors.LIGHT_GRAY}
                  width={100}
                  height={100}
                />
                <Text
                  style={{
                    color: Colors.LIGHT_GRAY,
                    fontWeight: "600",
                    fontSize: 17,
                  }}
                >
                  No record
                </Text>
              </View>
            ) : (
              <View>
                {props.data?.map((item, index) => (
                  <TransactionItem {...item} key={index} />
                ))}
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: Colors.BACKGROUND,
    justifyContent: "flex-start",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  body: {
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  tabContainer: {
    backgroundColor: Colors.TEXT_LIGHT,
  },
  tabStyle: {
    borderRadius: 2,
    border: `1em solid ${Colors.PRIMARY}`,
    paddingVertical: 10,
    paddingHorizontal: Dimensions.get("screen").width / 17,
  },
  tabTextStyle: {
    fontWeight: "500",
    fontSize: 15,
  },
});
