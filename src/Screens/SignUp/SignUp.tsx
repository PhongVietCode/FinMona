import { Checkbox, Stack } from "native-base";
import React, { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { gStyles } from "../../Theme";
import { styles } from "./SignUp.style";
import { UserInput } from "@/Components";
import { Colors } from "@/Theme/Variables";
import { BigButton } from "@/Components/BigButton/BigButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
const SignUp = () => {
  const [checkPass, setCheckPass] = useState(false);
  const [form, setForm] = useState({
    name: String,
    email: String,
    password: String,
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View style={styles.header}>
        <Text style={gStyles.title1}>Sign up</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <UserInput
            lable="Name:"
            showIcon={false}
            placeholder="Your full name"
            secureText={false}
            mode="text"
            onChange={(name: any) => setForm({ ...form, name })}
          />
          <UserInput
            lable="Email*:"
            showIcon={false}
            placeholder="youremail@gmail.com"
            secureText={false}
            mode="email"
            onChange={(email: any) => setForm({ ...form, email })}
          />
          <UserInput
            lable="Password*:"
            showIcon={true}
            placeholder="*****"
            secureText={true}
            mode="none"
            onChange={(password: any) => setForm({ ...form, password })}
          />
          <View style={{ width: "100%" }}>
            <UserInput
              lable="Confirm password*:"
              showIcon={true}
              placeholder="*****"
              secureText={true}
              mode="none"
              onChange={(password: any) => {
                setCheckPass(form.password != password);
              }}
            />
            {checkPass && (
              <Text style={{ marginTop: 4, color: Colors.WARN }}>
                *Not match the password
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 6,
            paddingRight: 10,
          }}
        >
          <Checkbox value="" colorScheme="blue" aria-label="Remember me" />
          <Text style={[gStyles.title3, {flex: 1}]}>By signing up, you agree to the <Text style={{color:Colors.PRIMARY, fontWeight: '600'}}>Term of Service and Privacy Policy</Text></Text>
        </View>
        <BigButton
          text={"Sign Up"}
          backgroundColor={Colors.PRIMARY}
          textColors={Colors.WHITE}
          icon={undefined}
          onPress={() => {
            navigation.navigate(RootScreens.MAIN);
          }}
        />
        <Text style={[gStyles.title3, { color: Colors.LIGHT_GRAY }]}>
          Already have account ?{" "}
          <Text
            style={{ color: Colors.PRIMARY, fontWeight: "600" }}
            onPress={() => {
              navigation.navigate(RootScreens.LOGIN);
            }}
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default SignUp;
