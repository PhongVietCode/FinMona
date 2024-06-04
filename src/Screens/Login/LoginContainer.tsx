import React, { useEffect, useState } from "react";
import Login from "./Login";
import { UserLoginInfo, useLoginUserMutation } from "@/Services";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, SafeAreaView, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setEmail, setPassword, setToken } from "@/Store/reducers";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import * as Sentry from "@sentry/react-native";
import { Colors, FontSize } from "@/Theme/Variables";
import LottieView from "lottie-react-native";
import { gStyles } from "@/Theme";
import { BigButton } from "@/Components/BigButton/BigButton";

const LoginContainer = () => {
  const [loginUser, { data, isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const router = useRoute();

  const param = router.params as UserLoginInfo;
  useEffect(() => {
    if (param != undefined) {
      console.log("--phong");
      loginUser({ body: param })
        .unwrap()
        .then((fullfilled: { token: string }) => {
          AsyncStorage.setItem("token", fullfilled.token);
          AsyncStorage.setItem("email", param.email);
          dispatch(setPassword(param.password));
          dispatch(setToken(fullfilled.token));
          dispatch(setEmail(param.email));
          setShow(true);
          console.log("phong");
        })
        .catch((rejected) => {
          Sentry.captureException(rejected);
        });
    }
  }, []);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <>
      {param ? (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flexGrow: 1 }}>
            {show ? (
              <LottieView
                autoPlay
                style={{
                  height: 400,
                  backgroundColor: Colors.TRANSPARENT,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../../../assets/anim/done_anim.json")}
              />
            ) : (
              <LottieView
                autoPlay
                style={{
                  height: 400,
                  backgroundColor: Colors.TRANSPARENT,
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require("../../../assets/anim/loading_anim.json")}
              />
            )}
          </View>
          {show ? (
            <View style={{ width: "100%", paddingHorizontal: 16 }}>
              <BigButton
                text={"Get Start !"}
                backgroundColor={Colors.PRIMARY}
                textColors={Colors.WHITE}
                icon={undefined}
                onPress={() => {
                  navigation.navigate(RootScreens.LOAD);
                }}
                textStyle={FontSize.REGULAR}
              ></BigButton>
            </View>
          ) : (
            <Text
              style={[
                gStyles.regular1,
                { color: Colors.PRIMARY, fontWeight: "500", marginBottom: 30 },
              ]}
            >
              Creating your account...
            </Text>
          )}
          <View style={{ height: 30 }}></View>
        </SafeAreaView>
      ) : (
        <Login />
      )}
    </>
  );
};
export default LoginContainer;
