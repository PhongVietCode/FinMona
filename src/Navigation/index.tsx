import React, { useEffect, useRef } from "react";
import { StatusBar } from "react-native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { MainNavigator } from "./Main";
import { RootScreens } from "@/Screens";
import { OnboardContainer } from "@/Screens/Onboard";
import LoginContainer from "@/Screens/Login/LoginContainer";
import { SignUpContainer } from "@/Screens/SignUp";
import { AddTransactionContainer } from "@/Screens/Add_Transaction";
import { TransacDetailContainer } from "@/Screens/TransacDetail/TransacDetailContainer";
import { AddTagContainer } from "@/Screens/Add_Tag";
import { LoadingScreenContainer } from "@/Screens/Loading";
import { EditTransactionContainer } from "@/Screens/Edit_Transaction";
import { BudgetScreenContainer } from "@/Screens/Budget";
import { SplashScreenContainer } from "@/Screens/Splash";
import { UserLoginInfo } from "@/Services";
import { UpdateUserContainer } from "@/Screens/Update_User";
import * as Sentry from "@sentry/react-native";
import { FeedbackContainer } from "@/Screens/Feedback";
export type RootStackParamList = {
  [RootScreens.MAIN]: undefined;
  [RootScreens.WELCOME]: undefined;
  [RootScreens.ONBOARD]: undefined;
  [RootScreens.LOGIN]: UserLoginInfo | undefined;
  [RootScreens.SIGNUP]: undefined;
  [RootScreens.ADDTRANS]: undefined;
  [RootScreens.DETAIL]: undefined;
  [RootScreens.TAG]: undefined;
  [RootScreens.LOAD]: undefined;
  [RootScreens.EDITTRANS]: undefined;
  [RootScreens.BUDGET]: undefined;
  [RootScreens.SPLASH]: undefined;
  [RootScreens.UPDATE]: undefined;
  [RootScreens.FEEDBACK]: undefined;
};
const routingInstrumentation = new Sentry.ReactNavigationInstrumentation({
  enableTimeToInitialDisplay: true,
});

Sentry.init({
  dsn: "https://923ead9b2ba1027ea4a9e5112f1103de@o4507343432187904.ingest.us.sentry.io/4507343464169472",
  integrations: [
    new Sentry.ReactNativeTracing({
      enableUserInteractionTracing: true,
      routingInstrumentation,
      tracePropagationTargets: ["localhost"],
    }),
  ],
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

const RootStack = createNativeStackNavigator<RootStackParamList>();
// @refresh reset
const ApplicationNavigator = () => {
  const appContainer = useRef<NavigationContainerRef<RootStackParamList>>(null);
  return (
    <NavigationContainer
      ref={appContainer}
      onReady={() => {
        routingInstrumentation.registerNavigationContainer(appContainer);
      }}
    >
      <StatusBar />
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen
          name={RootScreens.SPLASH}
          component={SplashScreenContainer}
        />
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
        <RootStack.Screen name={RootScreens.TAG} component={AddTagContainer} />
        <RootStack.Screen
          name={RootScreens.LOAD}
          component={LoadingScreenContainer}
        />
        <RootStack.Screen
          name={RootScreens.EDITTRANS}
          component={EditTransactionContainer}
        />
        <RootStack.Screen
          name={RootScreens.BUDGET}
          component={BudgetScreenContainer}
        />
        <RootStack.Screen
          name={RootScreens.UPDATE}
          component={UpdateUserContainer}
        />
        <RootStack.Screen
          name={RootScreens.FEEDBACK}
          component={FeedbackContainer}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export { ApplicationNavigator };
