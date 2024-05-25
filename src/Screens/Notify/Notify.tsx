import { Header } from "@/Components/Header/Header";
import { NotificationItem } from "@/Components/NotificationItem/NotificationItem";
import { gStyles } from "@/Theme";
import { Colors } from "@/Theme/Variables";
import { ScrollView } from "native-base";
import React, { FunctionComponent } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GraphIcon from "../../../assets/icons/graph-increase.svg";
export const Notify: FunctionComponent = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      icon: <GraphIcon fill={Colors.TEXT_BOLD} />,
      label: "On no, Over Budget !",
      desc: "You have spend all the money this month",
      time: "10:09 AM",
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
          paddingBottom:10,
          gap: 10,
          flexGrow:1 
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
