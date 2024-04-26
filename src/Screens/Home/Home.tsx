import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Container, ScrollView } from "native-base";
import { User } from "@/Services";
import AddIcon from "../../../assets/icons/circle-plus.svg";
import EyeShow from "../../../assets/icons/eye-alt.svg";
import Search from "../../../assets/icons/search-alt.svg";
import { Colors, FontSize, MetricsSizes } from "@/Theme/Variables";
import { Header } from "@/Components/Header/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { gStyles } from "@/Theme";
import { LineChart } from "react-native-chart-kit";
import EyeSlash from "../../../assets/icons/eye-slash.svg";
import {
  TransacCategory,
  TransactionItem,
  TransactionProps,
  TransacType,
} from "@/Components/TransactionItem/TransactionItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { MoneySource } from "../Add_Transaction/AddTransaction";
export interface IHomeProps {
  data: User | undefined;
  isLoading: boolean;
}

export const Home = (props: IHomeProps) => {
  // const { data, isLoading } = props;
  const data = [
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

  const [dataShown, setDataShown] = useState(data[0]);

  const transac_list: TransactionProps[] = [
    {
      source: MoneySource.Card,
      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Card,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Card,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Card,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Borrow,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Card,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Card,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Card,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Card,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
    {
      source: MoneySource.Cash,

      transac_type: TransacType.Income,
      category: TransacCategory.Food,
      description: "This is for testing",
      title: "Buy me food",
      money: 102101,
      time: "10:09 AM",
    },
  ];
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
  const userImg = require("../../../assets/user_img.png");
  const [balance, setBalance] = useState("3.000.000");
  const [showBalance, setShowBalance] = useState(false);
  const viewOptions = ["Today", "Week", "Month", "Year"];
  const [selectedTab, setSelectedTab] = useState(viewOptions[0]);
  const [transacList, setTransacList] = useState(transac_list);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={
          <View style={[styles.center]}>
            <Text style={[gStyles.title1, { color: Colors.WARN }]}>
              Welcome,{" "}
            </Text>
            <Text style={[gStyles.title1, { color: Colors.TEXT_BOLD }]}>
              User name !
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
            }}
          >
            <ImageBackground
              source={userImg}
              resizeMode="contain"
              style={{ flex: 1, width: "100%" }}
            />
          </View>
        }
        center={null}
      />
      <View style={styles.body}>
        {/* ========= */}
        <View style={[styles.center, { flexDirection: "column" }]}>
          <Text style={[gStyles.regular2, { color: Colors.LIGHT_GRAY }]}>
            Account Balance
          </Text>
          <View style={[styles.center, { gap: 10 }]}>
            <Text
              style={[
                gStyles.title1,
                { fontWeight: "600", fontSize: FontSize.HUGE },
              ]}
            >
              {showBalance ? `${balance} đ` : "*********"}
            </Text>
            {showBalance ? (
              <EyeShow
                fill={Colors.TEXT_BOLD}
                onPress={() => {
                  setShowBalance(false);
                }}
              />
            ) : (
              <EyeSlash
                fill={Colors.TEXT_BOLD}
                onPress={() => {
                  setShowBalance(true);
                }}
              />
            )}
          </View>
        </View>
        {/* ========= */}
        <View style={{ paddingVertical: 10 }}>
          <Text style={[gStyles.title2, { alignSelf: "flex-start" }]}>
            Spend Recording:{" "}
          </Text>
          <View style={{ marginTop: 24, width: "100%" }}>
            <LineChart
              width={Dimensions.get("window").width - 20}
              data={dataShown}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        </View>
        <View style={{ width: "100%", marginBottom: 12 }}>
          <FlatList
            style={{
              backgroundColor: Colors.TEXT_LIGHT,
              alignSelf: "center",
              padding: 5,
              borderRadius: 14,
            }}
            data={viewOptions}
            horizontal
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setSelectedTab(item);
                  setDataShown(data[index]);
                }}
                style={[
                  styles.tabStyle,
                  {
                    backgroundColor:
                      selectedTab === item ? Colors.PRIMARY : Colors.WHITE,
                    borderTopLeftRadius: index == 0 ? 12 : 0,
                    borderBottomLeftRadius: index == 0 ? 12 : 0,
                    borderTopRightRadius:
                      index == viewOptions.length - 1 ? 12 : 0,
                    borderBottomRightRadius:
                      index == viewOptions.length - 1 ? 12 : 0,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.tabTextStyle,
                    {
                      color:
                        selectedTab === item ? Colors.WHITE : Colors.TEXT_BOLD,
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
              marginTop: 12,
              marginBottom: 8,
            },
          ]}
        >
          <Text style={[gStyles.title2]}>Highest Transactions: </Text>
          <Search fill={Colors.TEXT_BOLD} />
        </View>
        <FlatList
          style={{ height: Dimensions.get("screen").height / 3.8 }}
          contentContainerStyle={{ rowGap: 10 }}
          data={transacList}
          renderItem={({ item, index }) => (
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
          // keyExtractor={item => item.time}
        />
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
    paddingHorizontal: Dimensions.get("screen").width / 16,
  },
  tabTextStyle: {
    fontWeight: "500",
    fontSize: 15,
  },
});

// <StatusBar style="auto" />
//       {isLoading ? (
//         <HStack space={2} justifyContent="center">
//           <Spinner accessibilityLabel="Loading posts" />
//           <Heading color="primary.500" fontSize="md">
//             {i18n.t(LocalizationKey.LOADING)}
//           </Heading>
//         </HStack>
//       ) : (
//         <>
//           <Text>{i18n.t(LocalizationKey.HOME)}</Text>
//           <Heading color="primary.500" fontSize="md">
//             {data?.username}
//           </Heading>
//         </>
//       )}
