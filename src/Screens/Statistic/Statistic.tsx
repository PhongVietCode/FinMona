import { Header } from "@/Components/Header/Header";
import { gStyles } from "@/Theme";
import { Colors } from "@/Theme/Variables";

import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowDown from "../../../assets/icons/chevron-down.svg";
import ArrowRight from "../../../assets/icons/chevron-right.svg";
import { PieChart } from "react-native-chart-kit";
import {
  TransactionItem,
  Transaction,
  transactionStyle,
  moneyConvert,
} from "@/Components/TransactionItem/TransactionItem";
import ShoppingIcon from "../../../assets/icons/shopping-bag-14.svg";
import Food from "../../../assets/icons/food_2.svg";
import TransportIcon from "../../../assets/icons/school-bus.svg";
import PartyIcon from "../../../assets/icons/party horn.svg";
import { MotiScrollView, MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import {
  Tag,
  useLazyGetAllTagsQuery,
  useLazyGetRecordByCategoryQuery,
  useLazyGetRecordByMoneySourceQuery,
  useLazyGetRecordByTimeRangeQuery,
} from "@/Services";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import LottieView from "lottie-react-native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";
import EmptyGraph from "../../../assets/icons/graph.svg";
import EmptyIcon from "../../../assets/icons/empty.svg";
interface StatisticProps {
  data: Transaction[] | [];
}
export const Statistic = (props: StatisticProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const typeList = ["Category", "Money Source"];
  const listIcon = [
    {
      icon: <ShoppingIcon fill={Colors.WHITE} />,
      color: Colors.CAUTION,
      label: "Shopping",
    },
    {
      icon: <Food fill={Colors.WHITE} />,
      color: Colors.WARN,
      label: "Food",
    },
    {
      icon: <TransportIcon fill={Colors.WHITE} />,
      color: Colors.GREEN_80,
      label: "Transport",
    },
    {
      icon: <PartyIcon fill={Colors.WHITE} />,
      color: Colors.PRIMARY,
      label: "Party",
    },
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [fetchRecordByTimeRange] = useLazyGetRecordByTimeRangeQuery();
  const [fetchRecordByCategory] = useLazyGetRecordByCategoryQuery();
  const [fetchRecordByMoneySource] = useLazyGetRecordByMoneySourceQuery();
  const [fetchTag, { data }] = useLazyGetAllTagsQuery();
  const [recordList, setRecordList] = useState<Transaction[]>([]);
  const [isLoading, setisLoading] = useState(true);
  const [choosenCategory, setChoosenCategory] = useState(listIcon[0].label);

  const [listSource, setListSource] = useState<string[]>([]);
  const [choosenMoneySource, setChoosenMoneySource] = useState<string>("");

  const [viewChoice, setViewChoice] = useState(typeList[0]);
  const [monthIndex, setMonthIndex] = useState(0);
  const [viewTime, setViewTime] = useState({
    month: months[monthIndex],
    year: 2024,
  });

  const types = ["Income", "Expense"];
  const [transType, setTransType] = useState(types[0]);

  const changeViewTime = (i: number) => {
    setMonthIndex(monthIndex + i);
    if (monthIndex > 11) {
      setMonthIndex(0);
      setViewTime({ ...viewTime, year: viewTime.year++ });
      setViewTime({ ...viewTime, month: months[0] });
    } else if (monthIndex < 0) {
      setViewTime({ ...viewTime, year: viewTime.year-- });
      setViewTime({ ...viewTime, month: months[11] });
      setMonthIndex(11);
    } else {
      setViewTime({ ...viewTime, month: months[monthIndex] });
    }
  };

  const [categoryPercentage, setCatgoryPercentage] = useState({
    Shopping: 25,
    Food: 25,
    Transport: 25,
    Party: 25,
  });
  const [loadingGraph, setLoadingGraph] = useState(false);
  const graphData = [
    {
      name: "Food",
      percent: categoryPercentage.Food,
      color: transactionStyle("Food")?.backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Party",
      percent: categoryPercentage.Party,
      color: transactionStyle("Party")?.backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Transport",
      percent: categoryPercentage.Transport,
      color: transactionStyle("Transport")?.backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Shopping",
      percent: categoryPercentage.Shopping,
      color: transactionStyle("Shopping")?.backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(81, 110, 252, ${opacity})`,
    labelColor: (opacity = 1) => Colors.TEXT_BOLD,
  };
  const user = useSelector((state: RootState) => state.user);
  const budget = useSelector((state: RootState) => state.budget);
  const [recentSum, setRecentSum] = useState(0);
  const [limitSum, setLimitSum] = useState(Number(budget.limitBudget));
  const daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const date = new Date(Date.now());
  let currentMonth = "01";
  if (date.getMonth() + 1 < 10) {
    currentMonth = "0" + (date.getMonth() + 1).toString();
  } else {
    currentMonth = (date.getMonth() + 1).toString();
  }

  const fillterRecordByMonth = () => {
    fetchRecordByTimeRange({
      id: user.id,
      startDate: `01-${currentMonth}-${date.getFullYear()}`,
      endDate: `${
        daysInMonth[date.getMonth()]
      }-${currentMonth}-${date.getFullYear()}`,
    })
      .unwrap()
      .then((fullfilled) => {
        let totalAmount = 0;
        fullfilled.map((item) => {
          if (item.isIncome == false) {
            totalAmount += item.amount;
          }
        });
        setRecentSum(totalAmount);
      })
      .catch((rejected) => {});
  };
  const handleCategoryChoosen = (item: string, filter?: boolean) => {
    setisLoading(true);
    setChoosenCategory(item);
    fetchRecordByCategory({ id: user.id, categoryName: item })
      .unwrap()
      .then((fullfilled: Transaction[]) => {
        if (filter != undefined) {
          setRecordList(fullfilled.filter((item) => item.isIncome === filter));
        } else {
          setRecordList(fullfilled);
        }
        setisLoading(false);
      })
      .catch((rejected) => {});
  };
  const handleMoneySourceChoosen = (item: string, filter?: boolean) => {
    setisLoading(true);
    setChoosenMoneySource(item);
    fetchRecordByMoneySource({ id: user.id, moneySourceName: item })
      .unwrap()
      .then((fullfilled) => {
        if (filter != undefined) {
          setRecordList(fullfilled.filter((item) => item.isIncome === filter));
        } else {
          setRecordList(fullfilled);
        }
        setisLoading(false);
      })
      .catch((rejected) => {
        setisLoading(false);
      });
  };
  const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

  const calculateCategoryPercentage = async () => {
    setLoadingGraph(true);
    if (props.data == undefined) {
      return;
    }
    let length = props.data.length;
    if (length <= 0) length = 1;
    await fetchRecordByCategory({
      id: user.id,
      categoryName: listIcon[0].label,
    })
      .unwrap()
      .then((fullfilled: Transaction[]) => {
        const pct = (fullfilled.length * 100) / length;
        setCatgoryPercentage((oldPct) => ({
          ...oldPct,
          [listIcon[0].label]: pct,
        }));
      })
      .catch((rejected) => {});
    await fetchRecordByCategory({
      id: user.id,
      categoryName: listIcon[1].label,
    })
      .unwrap()
      .then((fullfilled: Transaction[]) => {
        setCatgoryPercentage((oldPct) => ({
          ...oldPct,
          [listIcon[1].label]: (fullfilled.length * 100) / length,
        }));
      })
      .catch((rejected) => {});
    await fetchRecordByCategory({
      id: user.id,
      categoryName: listIcon[2].label,
    })
      .unwrap()
      .then((fullfilled: Transaction[]) => {
        setCatgoryPercentage((oldPct) => ({
          ...oldPct,
          [listIcon[2].label]: (fullfilled.length * 100) / length,
        }));
      })
      .catch((rejected) => {});
    await fetchRecordByCategory({
      id: user.id,
      categoryName: listIcon[3].label,
    })
      .unwrap()
      .then((fullfilled: Transaction[]) => {
        setCatgoryPercentage((oldPct) => ({
          ...oldPct,
          [listIcon[3].label]: (fullfilled.length * 100) / length,
        }));
      })
      .catch((rejected: string) => {
        console.log(rejected);
      });
    setLoadingGraph(false);
    console.log(categoryPercentage);
    console.log(graphData);
  };
  useEffect(() => {
    fetchTag({ id: user.id })
      .unwrap()
      .then((fullfilled: Tag[]) => {
        setListSource(
          fullfilled
            .map((item) => item.title)
            .filter((item) => item.split("_")[1] == "undefined")
        );
        setChoosenMoneySource(listSource[0]);
        // handleMoneySourceChoosen(listSource[0]);
      })
      .catch((rejected) => {});
  }, []);

  useEffect(() => {
    if (viewChoice == typeList[0]) {
      handleCategoryChoosen(choosenCategory, transType == types[0]);
    } else {
      handleMoneySourceChoosen(choosenMoneySource, transType == types[0]);
    }
  }, [transType, props.data]);

  useEffect(() => {
    const tempFunc = async () => await calculateCategoryPercentage();
    if (viewChoice == typeList[0]) {
      handleCategoryChoosen(listIcon[0].label, transType == types[0]);
      tempFunc();
    } else {
      handleMoneySourceChoosen(listSource[0], transType == types[0]);
      fillterRecordByMonth();
    }
  }, [viewChoice]);
  useEffect(() => {
    setLimitSum(Number(budget.limitBudget));
  }, [budget.limitBudget]);

  return (
    <SafeAreaView style={{ display: "flex", backgroundColor: Colors.WHITE }}>
      <Header
        left={<View></View>}
        right={<View></View>}
        center={
          <Text style={[gStyles.title1, { fontSize: 28, fontWeight: "800" }]}>
            Statistic
          </Text>
        }
      />

      <View
        style={{
          paddingHorizontal: 16,
          height: "90.5%",
        }}
      >
        <View style={styles.btn_grp}>
          <FlatList
            contentContainerStyle={{
              display: "flex",
              gap: 8,
            }}
            horizontal
            data={typeList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setViewChoice(item)}
                style={[
                  styles.btn_container,
                  {
                    backgroundColor:
                      viewChoice === item ? Colors.PRIMARY : Colors.TRANSPARENT,
                    justifyContent: "center",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.btn_text,
                    {
                      color:
                        viewChoice === item ? Colors.WHITE : Colors.LIGHT_GRAY,
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
          <Pressable
            style={{
              paddingHorizontal: 8,
              paddingVertical: 10,
              gap: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              borderWidth: 1,
              borderColor: Colors.TEXT_LIGHT,
              borderRadius: 8,
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <ArrowDown fill={Colors.PRIMARY} height={16} />
            <Text>Month</Text>
          </Pressable>
        </View>
        {/* <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingVertical: 16,
          }}
        >
          <Pressable onPress={() => changeViewTime(-1)}>
            <ArrowLeft fill={Colors.TEXT_BOLD} />
          </Pressable>
          <Text style={{ fontSize: 21, fontWeight: "600" }}>
            {viewTime.month}/{viewTime.year}
          </Text>
          <Pressable onPress={() => changeViewTime(1)}>
            <ArrowRight fill={Colors.TEXT_BOLD} />
          </Pressable>
        </View> */}
        <View style={{ marginTop: 20 }}>
          <FlatList
            scrollEnabled={false}
            horizontal
            style={[styles.tabContainer]}
            data={types}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => setTransType(types[index])}
                style={[
                  styles.tabBtn,
                  {
                    backgroundColor:
                      transType == item ? Colors.PRIMARY : Colors.TRANSPARENT,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color:
                        transType == item ? Colors.WHITE : Colors.TEXT_BOLD,
                    },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />
          <View
            style={[
              {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              },
            ]}
          >
            {viewChoice == typeList[0] && (
              <View>
                {loadingGraph ? (
                  <View style={{justifyContent:'center', alignItems:'center'}}>
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
                    <Text style={{fontWeight:'500', fontSize: 18, color:Colors.LIGHT_GRAY}}>Configuring graph...</Text>
                  </View>
                ) : (
                  <>
                    {props.data.length == 0 ? (
                      <></>
                    ) : (
                      <View style={{ flexDirection: "row" }}>
                        <View
                          style={{
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <PieChart
                            paddingLeft={"0"}
                            data={graphData}
                            width={Dimensions.get("screen").width}
                            height={240}
                            chartConfig={chartConfig}
                            accessor={"percent"}
                            backgroundColor={"transparent"}
                            center={[0 + 20, 0]}
                            hasLegend={false}
                          />
                          <FlatList
                            horizontal
                            style={{ flexDirection: "row" }}
                            data={listIcon}
                            contentContainerStyle={{
                              gap: 4,
                              paddingHorizontal: 16,
                              paddingVertical: 5,
                            }}
                            renderItem={({ item, index }) => (
                              <View
                                style={{
                                  padding: 6,
                                  borderColor: Colors.LIGHT_GRAY,
                                  borderWidth: 2,
                                  borderRadius: 17,
                                }}
                              >
                                <Text
                                  style={{ fontWeight: "500", fontSize: 16 }}
                                >
                                  {listIcon[index].label} :{" "}
                                  {Number(
                                    categoryPercentage[item.label]
                                  ).toFixed(2)}
                                  %
                                </Text>
                              </View>
                            )}
                          ></FlatList>
                        </View>
                        <MotiView
                          from={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          delay={400}
                          transition={{ type: "timing" }}
                          style={{
                            position: "absolute",
                            right: 20,
                            alignSelf: "center",
                          }}
                        >
                          {listIcon.map((item, index) => (
                            <Pressable
                              style={{
                                padding: 9,
                                backgroundColor:
                                  choosenCategory === item.label
                                    ? listIcon[index].color
                                    : Colors.TEXT_LIGHT,
                                flexDirection: "row",
                                marginBottom: 8,
                                alignItems: "center",
                                borderRadius: 12,
                                gap: 5,
                                elevation: 2,
                              }}
                              key={index}
                              onPress={() =>
                                handleCategoryChoosen(
                                  item.label,
                                  transType == types[0]
                                )
                              }
                            >
                              {listIcon[index].icon}
                              <Text
                                style={{
                                  color: Colors.WHITE,
                                  fontWeight: "700",
                                  fontSize: 15,
                                }}
                              >
                                {item.label}
                              </Text>
                            </Pressable>
                          ))}
                        </MotiView>
                      </View>
                    )}
                  </>
                )}
              </View>
            )}
            {viewChoice == typeList[1] && (
              <>
                <View
                  style={{
                    backgroundColor: Colors.BACKGROUND,
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 18,
                    gap: 5,
                  }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      flexGrow: 1,
                    }}
                  >
                    <View style={{}}>
                      <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 18,
                          color: Colors.LIGHT_GRAY,
                        }}
                        ellipsizeMode="tail"
                      >
                        This month you have spend
                      </Text>
                      <Text style={{ fontWeight: "600", fontSize: 24 }}>
                        {moneyConvert(Number(recentSum))}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexGrow: 1,
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          color: Colors.PRIMARY,
                          fontSize: 18,
                          fontWeight: "500",
                          flexWrap: "wrap",
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {moneyConvert(Number(limitSum))}
                      </Text>
                    </View>
                    <Pressable
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "flex-start",
                        gap: 10,
                        backgroundColor: Colors.STROKE,
                        padding: 5,
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                      onPress={() => navigation.navigate(RootScreens.BUDGET)}
                    >
                      <Text
                        style={{
                          fontWeight: "400",
                          fontSize: 16,
                          paddingLeft: 8,
                        }}
                      >
                        Your Budget
                      </Text>
                      <ArrowRight
                        fill={Colors.TEXT_BOLD}
                        width={18}
                        height={18}
                      />
                    </Pressable>
                  </View>
                </View>
                <FlatList
                  horizontal
                  contentContainerStyle={{
                    gap: 10,
                    width: "100%",
                    marginBottom: 10,
                  }}
                  data={listSource}
                  renderItem={({ item, index }) => (
                    <Pressable
                      onPress={() => {
                        handleMoneySourceChoosen(item, transType == types[0]);
                      }}
                      style={{
                        backgroundColor:
                          choosenMoneySource == item
                            ? Colors.PRIMARY
                            : Colors.STROKE,
                        padding: 10,
                        borderRadius: 12,
                      }}
                      key={index}
                    >
                      <Text
                        style={{
                          color:
                            choosenMoneySource == item
                              ? Colors.WHITE
                              : Colors.LIGHT_GRAY,
                          fontSize: 16,
                          fontWeight: "500",
                        }}
                      >
                        {item.split("_")[0]}
                      </Text>
                    </Pressable>
                  )}
                />
              </>
            )}
          </View>
        </View>
        {isLoading ? (
          <MotiScrollView
            contentContainerStyle={{ gap: 10 }}
            transition={{ type: "timing" }}
            from={{ opacity: 0, scale: 0.1 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {[...Array(3).keys()].map((i) => (
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
          <>
            {recordList.length == 0 ? (
              <ScrollView
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  flexDirection: "column",
                  marginTop: 20,
                }}
              >
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
              </ScrollView>
            ) : (
              <FlatList
                contentContainerStyle={{
                  gap: 10,
                  paddingVertical: 10,
                  flexGrow: 1,
                }}
                data={recordList}
                renderItem={({ item, index }) => (
                  <TransactionItem {...item} key={index} />
                )}
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btn_grp: {
    display: "flex",
    flexDirection: "row",
  },
  btn_container: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderColor: Colors.LIGHT_GRAY,
    borderWidth: 1,
  },
  btn_text: {
    fontWeight: "600",
    fontSize: 14,
    color: Colors.WHITE,
  },
  tabContainer: {
    backgroundColor: Colors.STROKE,
    alignSelf: "center",
    padding: 5,
    borderRadius: 32,
    shadowColor: Colors.ERROR,
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: Dimensions.get("screen").width / 8,
    borderRadius: 40,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 16,
  },
});
