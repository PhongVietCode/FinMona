import { Checkbox, Stack } from "native-base";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { gStyles } from "../../Theme";
import { styles } from "./Login.style";
import { UserInput } from "@/Components";
import { Colors, FontSize } from "@/Theme/Variables";
import { BigButton } from "@/Components/BigButton/BigButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import {
  UserLoginInfo,
  useLazyGetUserQuery,
  useLoginUserMutation,
} from "@/Services";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store";
import { setEmail, setPassword, setToken } from "@/Store/reducers/user";
const Login = () => {
  const initialForm: UserLoginInfo = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState<UserLoginInfo>(initialForm);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loginUser] = useLoginUserMutation();
  const user = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View style={styles.header}>
        <Text style={gStyles.title1}>Login</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <UserInput
            lable="Email:"
            showIcon={false}
            placeholder="youremail@gmail.com"
            secureText={false}
            mode="email"
            onChange={(email: any) => setForm({ ...form, email })}
          />
          <UserInput
            lable="Password:"
            showIcon={true}
            placeholder="*****"
            secureText={true}
            mode="none"
            onChange={(password: any) => setForm({ ...form, password })}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Checkbox value="" colorScheme="blue" aria-label="Remember me" />
          <Text style={gStyles.title3}>Remember me</Text>
        </View>
        <BigButton
          text={"Login"}
          backgroundColor={Colors.PRIMARY}
          textColors={Colors.WHITE}
          icon={undefined}
          textStyle={FontSize.REGULAR}
          onPress={async () => {
            try {
              loginUser({ body: form })
                .unwrap()
                .then((fullfilled: {token: string}) => {
                  AsyncStorage.setItem('token', fullfilled.token)
                  AsyncStorage.setItem('email', form.email)
                  dispatch(setToken(fullfilled.token))
                  dispatch(setEmail(form.email))
                  dispatch(setPassword(form.password))
                  setForm(initialForm)
                  navigation.navigate(RootScreens.LOAD)
                })
                .catch((rejected) => {
                  Alert.alert("Invalid password or email", "Try again", [
                    {
                      text: "Ok",
                    },
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                  ]);
                });
            } catch (error) {
              Alert.alert("Invalid password or email", "Try again", [
                {
                  text: "Ok",
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]);
            }
            // navigation.navigate(RootScreens.MAIN);
          }}
        />
        <BigButton
          text={"Forgot password ?"}
          backgroundColor={Colors.TRANSPARENT}
          textColors={Colors.LIGHT_GRAY}
          icon={undefined}
          textStyle={FontSize.REGULAR}
          onPress={() => {}}
        />
        <Text style={[gStyles.title3, { color: Colors.LIGHT_GRAY }]}>
          Don't have account ?{" "}
          <Text
            style={{ color: Colors.PRIMARY, fontWeight: "600" }}
            onPress={() => {
              navigation.navigate(RootScreens.SIGNUP);
            }}
          >
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Login;
