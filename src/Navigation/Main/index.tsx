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
import StatisticIcon from "../../../assets/icons/graph-increase.svg"
import BellIcon from "../../../assets/icons/bell-alt-1.svg"
import TimeSettingIcon from "../../../assets/icons/time-settings.svg"
import AddIcon from "../../../assets/icons/circle-plus.svg"
import { Text, TouchableOpacity, View } from "react-native";
import { Colors, FontSize } from "@/Theme/Variables";
const Tab = createBottomTabNavigator();


const AddNewTransactionButton = (props:any) =>(
  <TouchableOpacity onPress={props.onPress} style={{
    top: -25,
    justifyContent:'center',
    alignItems:'center',
  }}>
    <View style={{width: 70, height: 70, borderRadius: 35, backgroundColor:Colors.PRIMARY, display:'flex', justifyContent:'center', alignItems:'center'}}>
      <AddIcon width={24} height={24} fill={Colors.WHITE}/>
    </View>
  </TouchableOpacity>
)
// @refresh reset
export const MainNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:true,
      tabBarShowLabel:true,
      tabBarHideOnKeyboard: true, 
    }}>
      <Tab.Screen
        name="Home"
        component={HomeContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{display: 'flex', justifyContent:'space-around', alignItems:'center', height: '100%', padding:2}}>
              <HomeIcon fill={focused ? Colors.PRIMARY: Colors.LIGHT_GRAY}/>
              {/* <Text style={{color: focused ? Colors.PRIMARY: Colors.LIGHT_GRAY, fontSize:13}}>Home</Text> */}
            </View>
          ),
          tabBarLabelPosition: "below-icon",
          headerTitle: 'phong',
          headerLeft: () => (
            <Text>Phong</Text>
          ),
          headerRight: () => (
            <Text>HIHI</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Statistic"
        component={StatisticContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{display: 'flex', justifyContent:'space-around', alignItems:'center', height: '100%', padding:2}}>
              <StatisticIcon fill={focused ? Colors.PRIMARY: Colors.LIGHT_GRAY}/>
              {/* <Text style={{color: focused ? Colors.PRIMARY: Colors.LIGHT_GRAY, fontSize:13}}>Home</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name=" "
        component={NotifyContainer}
        options={{
          tabBarButton: (props) => (
            <AddNewTransactionButton props={props}/>
          )
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotifyContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{display: 'flex', justifyContent:'space-around', alignItems:'center', height: '100%', padding:2}}>
              <BellIcon fill={focused ? Colors.PRIMARY: Colors.LIGHT_GRAY}/>
              {/* <Text style={{color: focused ? Colors.PRIMARY: Colors.LIGHT_GRAY, fontSize:13}}>Home</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingContainer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{display: 'flex', justifyContent:'space-around', alignItems:'center', height: '100%', padding:2}}>
              <TimeSettingIcon fill={focused ? Colors.PRIMARY: Colors.LIGHT_GRAY}/>
              {/* <Text style={{color: focused ? Colors.PRIMARY: Colors.LIGHT_GRAY, fontSize:13}}>Home</Text> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
