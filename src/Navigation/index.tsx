import React from "react";
import { StatusBar } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { WelcomeContainer } from "@/Screens/Welcome";
import { RootScreens } from "@/Screens";
import { OnboardContainer } from "@/Screens/Onboard";
import LoginContainer from "@/Screens/Login/LoginContainer";
import { SignUpContainer } from "@/Screens/SignUp";
import { AddTransactionContainer } from "@/Screens/Add_Transaction";
import { TransacDetailContainer } from "@/Screens/TransacDetail/TransacDetailContainer";
import { TransacCategory, TransacType, TransactionProps } from "@/Components/TransactionItem/TransactionItem";

export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARD]: undefined;
  [RootScreens.LOGIN]: undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.ADDTRANS]:undefined;
  [RootScreens.DETAIL]:TransactionProps;

};

const RootStack = createNativeStackNavigator<RootStackParamList>();

// @refresh reset
const ApplicationNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen 
          name={RootScreens.ONBOARD}
          component={OnboardContainer}
        />
        <RootStack.Screen
          name={RootScreens.LOGIN}
          component={LoginContainer}
          options={{
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name={RootScreens.SIGNUP}
          component={SignUpContainer}
          options={{
            gestureEnabled: false,
          }}
        />
        {/* <RootStack.Screen
          name={RootScreens.WELCOME}
          component={WelcomeContainer}
        /> */}
        <RootStack.Screen
          name={RootScreens.DETAIL}
          component={TransacDetailContainer}
        />
        <RootStack.Screen
          name={RootScreens.MAIN}
          component={MainNavigator}
          options={{
            gestureEnabled: false,
          }}
        />
        <RootStack.Screen
          name={RootScreens.ADDTRANS}
          component={AddTransactionContainer}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
