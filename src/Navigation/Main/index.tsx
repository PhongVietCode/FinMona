import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "..";
import { StatisticContainer } from "@/Screens/Statistic";
import { NotifyContainer } from "@/Screens/Notify";
import { SettingContainer } from "@/Screens/Setting/SettingContainer";
import HomeIcon from "../../../assets/icons/home.svg";
import StatisticIcon from "../../../assets/icons/graph-increase.svg";
import BellIcon from "../../../assets/icons/bell-alt-1.svg";
import TimeSettingIcon from "../../../assets/icons/time-settings.svg";
import AddIcon from "../../../assets/icons/circle-plus.svg";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/Theme/Variables";
import { RootScreens } from "@/Screens";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
const Tab = createBottomTabNavigator();

const AddNewTransactionButton = (props: any) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      top: -25,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.PRIMARY,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AddIcon width={24} height={24} fill={Colors.WHITE} />
    </View>
  </TouchableOpacity>
);
// @refresh reset
export const MainNavigator = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const bagdeCount = useSelector((state: RootState) => state.notify.badgeCount);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          paddingVertical: Platform.OS == "ios" ? 20 : 0,
          paddingHorizontal: 10,
          height: 70,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={style.btn_nav}>
              <HomeIcon fill={focused ? Colors.PRIMARY : Colors.LIGHT_GRAY} />
              <Text
                style={{
                  color: focused ? Colors.PRIMARY : Colors.LIGHT_GRAY,
                  fontSize: 13,
                }}
              >
                Home
              </Text>
            </View>
          ),
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tab.Screen
        name="Statistic"
        component={StatisticContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={style.btn_nav}>
              <StatisticIcon
                fill={focused ? Colors.PRIMARY : Colors.LIGHT_GRAY}
              />
              <Text
                style={{
                  color: focused ? Colors.PRIMARY : Colors.LIGHT_GRAY,
                  fontSize: 13,
                }}
              >
                Statistic
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name=" "
        component={NotifyContainer}
        options={{
          tabBarButton: (props) => (
            <AddNewTransactionButton
              props={props}
              onPress={() => navigation.navigate(RootScreens.ADDTRANS)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotifyContainer}
        options={{
          tabBarBadge: bagdeCount,
          tabBarBadgeStyle: {
            backgroundColor: Colors.ERROR,
            color: Colors.WHITE,
            fontWeight: "700",
            display: bagdeCount ? 'flex' : 'none'
          },
          tabBarIcon: ({ focused }) => (
            <View style={style.btn_nav}>
              <BellIcon fill={focused ? Colors.PRIMARY : Colors.LIGHT_GRAY} />
              <Text
                style={{
                  color: focused ? Colors.PRIMARY : Colors.LIGHT_GRAY,
                  fontSize: 13,
                }}
              >
                Notify
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={style.btn_nav}>
              <TimeSettingIcon
                fill={focused ? Colors.PRIMARY : Colors.LIGHT_GRAY}
              />
              <Text
                style={{
                  color: focused ? Colors.PRIMARY : Colors.LIGHT_GRAY,
                  fontSize: 13,
                }}
              >
                Setting
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const style = StyleSheet.create({
  btn_nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: 2,
  },
});
