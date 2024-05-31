import { Header } from "@/Components/Header/Header";
import { NotificationItem } from "@/Components/NotificationItem/NotificationItem";
import { gStyles } from "@/Theme";
import { Colors } from "@/Theme/Variables";
import { ScrollView } from "native-base";
import React, { FunctionComponent } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GraphIcon from "../../../assets/icons/graph-increase.svg";
// import { MainNavigator } from "@/Navigation/Main";
export const Notify: FunctionComponent = () => {
  const data = [];

  const date = new Date(Date.now());
  const postFix = date.getHours() > 12 ? "PM" : "AM";

  for (let i = 0; i < 1; i++) {
    data.push({
      icon: <GraphIcon fill={Colors.TEXT_BOLD} />,
      label: "Welcome to FinMona",
      desc: "Hope this app will you to be more discipline",
      time: `${date.getHours()} : ${date.getMinutes()} ${postFix}`,
    });
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      <Header
        left={<View></View>}
        right={<View></View>}
        center={<Text style={gStyles.title1}>Notification</Text>}
      />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 10,
          gap: 10,
          flexGrow: 1,
        }}
        data={data}
        renderItem={({ item }) => (
          <NotificationItem
            icon={item.icon}
            label={item.label}
            detail={item.desc}
            time={item.time}
          />
        )}
      />
    </SafeAreaView>
  );
};
