import { Checkbox, Stack } from "native-base";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { gStyles } from "../../Theme";
import { styles } from "./Login.style";
import { UserInput } from "@/Components";
import { Colors } from "@/Theme/Variables";
import { BigButton } from "@/Components/BigButton/BigButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
const Login = () => {
  const [form, setForm] = useState({ email: String, password: String });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
          onPress={() => {
            navigation.navigate(RootScreens.MAIN)
          }}
        />
        <BigButton
          text={"Forgot password ?"}
          backgroundColor={Colors.TRANSPARENT}
          textColors={Colors.PRIMARY}
          icon={undefined}
          onPress={() => {}}
        />
        <Text style={[gStyles.title3, { color: Colors.LIGHT_GRAY }]}>
          Don't have account ?{" "}
          <Text
            style={{ color: Colors.PRIMARY, fontWeight: "600" }}
            onPress={() => {
                navigation.navigate(RootScreens.SIGNUP)
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
