import { i18n, LocalizationKey } from "@/Localization";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { useLazyGetUserQuery, User } from "@/Services";
import ArrowDown from "../../../assets/icons/arrow-down-circle.svg";
import ArrowUp from "../../../assets/icons/arrow-up-circle.svg";

import EyeShow from "../../../assets/icons/eye-alt.svg";
import Search from "../../../assets/icons/search-alt.svg";
import { Colors, FontSize } from "@/Theme/Variables";
import { Header } from "@/Components/Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyles } from "@/Theme";
import { LineChart } from "react-native-chart-kit";
import EyeSlash from "../../../assets/icons/eye-slash.svg";
import { MotiScrollView, MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

import {
  TransactionItem,
  Transaction,
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

export interface HomeProps {
  data: Transaction[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}
export const Home = (props: HomeProps) => {
  // const [isLoading, setIsLoading] = useState(false);

  const userImg = require("../../../assets/my_img.jpg");
  const [balance, setBalance] = useState("3.000.000");
  const [showBalance, setShowBalance] = useState(false);
  const viewOptions = ["Today", "Week", "Month", "Year"];
  const [selectedTab, setSelectedTab] = useState(viewOptions[0]);
  const record_list: Transaction[] = [];

  const [recordList, setRecordList] = useState(record_list);
  const graphList = [
    {
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sun"],
      datasets: [
        {
          data: [20, 45, 28, 80, 49, 170],
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
          data: [12, 41, 59, 80],
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
          data: [20, 45, 28, 80, 49, 170, 20, 45, 28, 80, 49, 170, 12, 213],
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
          data: [3124, 4125, 5125, 9823],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 5, // optional
          strokeColor: Colors.PRIMARY,
        },
      ],
      // legend: ["Your spending"], // optional
    },
  ];
  const [dataShown, setDataShown] = useState(graphList[0]);

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
    opacity.value = 0;
    scale.value = 0;
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withSpring(1, { duration: 400 });
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

  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={
          <View style={[styles.center]}>
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
            >
              User name
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
              source={userImg}
              resizeMode="cover"
              style={{ flex: 1, width: "100%" }}
            />
          </View>
        }
        center={null}
      />
      <View style={styles.body}>
        {/* ========= */}
        <View style={[styles.center, { flexDirection: "column" }]}>
          <Text
            style={[
              gStyles.regular2,
              { fontSize: 17, color: Colors.LIGHT_GRAY, fontWeight: "400" },
            ]}
          >
            Account Balance
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
              {showBalance ? `${balance} đ` : "*********"}
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
              <LineChart
                width={Dimensions.get("window").width - 52}
                data={dataShown}
                height={200}
                chartConfig={chartConfig}
                bezier
              />
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
                  setSelectedTab(item);
                  setDataShown(graphList[index]);
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
            Highest Transactions:{" "}
          </Text>
          <View
            style={{
              backgroundColor: Colors.TEXT_LIGHT,
              padding: 8,
              borderRadius: 50,
              elevation: 1,
            }}
          >
            <Search fill={Colors.TEXT_BOLD} />
          </View>
        </View>
        {props.isLoading ? (
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
          <FlatList
            style={{
              // height: Dimensions.get("screen").height / 3.8,
              paddingBottom: 10,
            }}
            contentContainerStyle={{ rowGap: 10 }}
            data={props.data}
            renderItem={({ item, index }) => (
              <TransactionItem {...item} key={index} />
            )}
          />
        )}
      </View>
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
