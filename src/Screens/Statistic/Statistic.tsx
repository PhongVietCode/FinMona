import { Header } from "@/Components/Header/Header";
import { gStyles } from "@/Theme";
import { Colors } from "@/Theme/Variables";
import { FlatList, ScrollView } from "native-base";
import React, { FunctionComponent, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrowDown from "../../../assets/icons/chevron-down.svg";
import ArrowLeft from "../../../assets/icons/chevron-left.svg";
import ArrowRight from "../../../assets/icons/chevron-right.svg";
import { PieChart } from "react-native-chart-kit";
import {
  TransacCategory,
  TransacType,
  TransactionItem,
  TransactionProps,
  transactionStyle,
} from "@/Components/TransactionItem/TransactionItem";
import { MoneySource } from "../Add_Transaction/AddTransaction";
export const Statistic: FunctionComponent = () => {
  const listChoice = ["Chart", "List Item", "Note"];
  const [viewChoice, setViewChoice] = useState(listChoice[0]);
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
  const [monthIndex, setMonthIndex] = useState(0);
  const [viewTime, setViewTime] = useState({
    month: months[monthIndex],
    year: 2024,
  });
  const [recentSum, setRecentSum] = useState(210000);
  const [limitSum, setLimitSum] = useState(500000);
  const types = ["Income", "Expense"];
  // const transacTypes = ["Food", "Party", "Transport", "Shopping"];
  // const transacCate = [TransacCategory.Food, TransacCategory.Party,TransacCategory.Transport,TransacCategory.Shopping]
  // const percentages = [10, 20, 40, 30]
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
  const transac_list: TransactionProps[] = [
    {
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },{
      source: MoneySource.Bank,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
  ];
  const data = [
    {
      name: "Food",
      percent: 10,
      color: transactionStyle(TransacCategory.Food).backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Party",
      percent: 20,
      color: transactionStyle(TransacCategory.Party).backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Transport",
      percent: 40,
      color: transactionStyle(TransacCategory.Transport).backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Shopping",
      percent: 30,
      color: transactionStyle(TransacCategory.Shopping).backgroundIconColor,
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(81, 110, 252, ${opacity})`,
    labelColor: (opacity = 1) => Colors.TEXT_BOLD,
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Header
        left={<View></View>}
        right={<View></View>}
        center={<Text style={gStyles.title1}>Statistic</Text>}
      />
      <View
        style={{
          paddingHorizontal: 16,
          width: "100%",
          backgroundColor: Colors.WHITE,
          flexGrow: 1,
        }}
      >
        <View style={styles.btn_grp}>
          <FlatList
            nestedScrollEnabled
            contentContainerStyle={{
              display: "flex",
              gap: 8,
            }}
            horizontal
            data={listChoice}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setViewChoice(item)}
                style={[
                  styles.btn_container,
                  {
                    backgroundColor:
                      viewChoice === item ? Colors.PRIMARY : Colors.TRANSPARENT,
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
              gap: 8,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              borderWidth: 1,
              borderColor: Colors.TEXT_BOLD,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <ArrowDown fill={Colors.PRIMARY} />
            <Text>Month</Text>
          </Pressable>
        </View>
        <View
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
        </View>
        <View>
          <FlatList
            nestedScrollEnabled
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: 10,
            }}
          >
            {viewChoice == listChoice[0] && (
              <PieChart
                paddingLeft={"0"}
                data={data}
                width={Dimensions.get("screen").width}
                height={300}
                chartConfig={chartConfig}
                accessor={"percent"}
                backgroundColor={"transparent"}
                center={[Dimensions.get("screen").width / 4, 0]}
                hasLegend={false}
              />
            )}
            {viewChoice == listChoice[1] && (
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
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 18,
                        color: Colors.LIGHT_GRAY,
                      }}
                    >
                      Remain(month)
                    </Text>
                    <Text style={{ fontWeight: "600", fontSize: 24 }}>
                      {recentSum}
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
                  >
                    <Text
                      style={{
                        fontWeight: "400",
                        fontSize: 16,
                        paddingLeft: 8,
                      }}
                    >
                      Ngân quỹ
                    </Text>
                    <ArrowRight
                      fill={Colors.TEXT_BOLD}
                      width={20}
                      height={20}
                    />
                  </Pressable>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: Colors.PRIMARY,
                      fontSize: 18,
                      fontWeight: "500",
                    }}
                  >
                    {limitSum}
                  </Text>
                  <View
                    style={{
                      display: "flex",
                      flexGrow: 0.7,
                      flexDirection: "column",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        borderRadius: 8,
                        overflow: "hidden",
                        height: 35,
                      }}
                    >
                      <View
                        style={{
                          backgroundColor: Colors.GREEN_80,
                          flexGrow: recentSum / limitSum,
                        }}
                      ></View>
                      <View
                        style={{
                          backgroundColor: Colors.TEXT_LIGHT,
                          flexGrow: 1 - recentSum / limitSum,
                        }}
                      ></View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 16, color: Colors.GREEN_80 }}>
                        {recentSum}
                      </Text>
                      <Text style={{ fontSize: 16 }}>{limitSum}</Text>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View
            style={{
              height:
                viewChoice == listChoice[0]
                  ? Dimensions.get("screen").height / 3.4
                  : Dimensions.get("screen").height / 2.1,
            }}
          >
            <FlatList
              contentContainerStyle={{ gap: 10 }}
              nestedScrollEnabled
              data={transac_list}
              renderItem={({ item }) => (
                <TransactionItem
                  source={item.source}
                  transac_type={item.transac_type}
                  description={item.description}
                  title={item.title}
                  money={item.money}
                  time={item.time}
                  category={item.category}
                />
              )}
            />
          </View>
        </View>
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
