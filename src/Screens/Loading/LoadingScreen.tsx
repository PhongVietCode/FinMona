import { RootStackParamList } from "@/Navigation";
import { User, useLazyGetUserQuery } from "@/Services";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Alert, Image, SafeAreaView, Text, View } from "react-native";
import { RootScreens } from "..";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store";
import LottieView from "lottie-react-native";
import {
  UserFullProps,
  setAvatar,
  setID,
  setUserName,
} from "@/Store/reducers/user";
import { ImageBackground } from "react-native";
import { Colors } from "@/Theme/Variables";
import { gStyles } from "@/Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLimitBudget } from "@/Store/reducers";
import * as Sentry from "@sentry/react-native";
const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));
export const LoadingScreen = () => {
  const [fetchUser, { data, isLoading }] = useLazyGetUserQuery();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [context, setContext] = useState("Loading your data...");
  const budget = useSelector((state: RootState) => state.budget);

  useEffect(() => {
    AsyncStorage.getItem("budget").then((onfullfilled: any) => {
      dispatch(setLimitBudget(onfullfilled || "0"));
    });
    fetchUser()
      .unwrap()
      .then(async (fullfilled: User[]) => {
        const _user = fullfilled.filter((u) => u.email == user.email);
        dispatch(setUserName(_user[0].name));
        dispatch(setID(_user[0].id));
        dispatch(setAvatar(_user[0].avatar));
        await delay(400);
        navigation.navigate(RootScreens.MAIN);
      })
      .catch(async (rejected: any) => {
        await delay(2000);
        console.log(rejected)
        Alert.alert(
          rejected["error"] || "Something went wrong",
          "You should try again later",
          [
            {
              text: "Ok",
            },
          ]
        );
        Sentry.captureException(rejected);
      });
  }, [data]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <LottieView
          autoPlay
          style={{
            height: 400,
            backgroundColor: Colors.TRANSPARENT,
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require("../../../assets/anim/loading_anim.json")}
        />
      </View>
      <Text
        style={[
          gStyles.regular1,
          { color: Colors.PRIMARY, fontWeight: "500", marginBottom: 30 },
        ]}
      >
        {context}
      </Text>
    </SafeAreaView>
  );
};
