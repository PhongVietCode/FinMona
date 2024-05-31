import { Checkbox, Stack } from "native-base";
import React, { useState } from "react";
import { Alert, Pressable, SafeAreaView, Text, View } from "react-native";
import { gStyles } from "../../Theme";
import { styles } from "./SignUp.style";
import { UserInput } from "@/Components";
import { Colors, FontSize } from "@/Theme/Variables";
import { BigButton } from "@/Components/BigButton/BigButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import { UserSignInInfo, useSignInUserMutation } from "@/Services";
const SignUp = () => {
  const [checkPass, setCheckPass] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const [form, setForm] = useState<UserSignInInfo>({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [login] = useSignInUserMutation();

  const handleLogin = () => {
    if (
      form.name.length == 0 ||
      form.email.length == 0 ||
      form.password.length == 0
    ) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    if (!checkPass && isChecked) {
      login({ body: form })
        .unwrap()
        .then((fullfilled: any) => {
          if (fullfilled["statusCode"] == "201") {
            // navigation.navigate(RootScreens.LOGIN);
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: RootScreens.LOGIN,
                  params: {
                    email: form.email,
                    password: form.password,
                  },
                },
              ],
            });
          } else {
            Alert.alert(fullfilled["message"], "Try again", [
              {
                text: "Ok",
              },
              {
                text: "Cancel",
                style: "cancel",
              },
            ]);
          }
        })
        .catch((rejected) => {});
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <View style={styles.header}>
        <Text style={gStyles.title1}>Sign up</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View>
            <UserInput
              lable="Name*:"
              showIcon={false}
              placeholder="Your full name"
              secureText={false}
              mode="text"
              onChange={(name: any) => setForm({ ...form, name })}
            />
            {isEmpty && form.name.length == 0 && (
              <Text style={{ marginTop: 4, color: Colors.WARN }}>
                *Not empty
              </Text>
            )}
          </View>
          <View>
            <UserInput
              lable="Email*:"
              showIcon={false}
              placeholder="youremail@gmail.com"
              secureText={false}
              mode="email"
              onChange={(email: any) => setForm({ ...form, email })}
            />
            {isEmpty && form.email.length == 0 && (
              <Text style={{ marginTop: 4, color: Colors.WARN }}>
                *Not empty
              </Text>
            )}
          </View>
          <View>
            <UserInput
              lable="Password*:"
              showIcon={true}
              placeholder="*****"
              secureText={true}
              mode="none"
              onChange={(password: any) => setForm({ ...form, password })}
            />
            {isEmpty && form.password.length == 0 && (
              <Text style={{ marginTop: 4, color: Colors.WARN }}>
                *Not empty
              </Text>
            )}
          </View>

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
          <View style={{ width: "100%" }}>
            <UserInput
              lable="Avatar Link (optional):"
              showIcon={true}
              placeholder="https://..."
              secureText={false}
              mode="none"
              onChange={(link: any) => {
                setForm({ ...form, avatar: link });
              }}
            />
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
          <Checkbox
            value=""
            colorScheme="blue"
            aria-label="Remember me"
            onChange={() => setisChecked(!isChecked)}
          />
          <Text style={[gStyles.title3, { flex: 1 }]}>
            By signing up, you agree to the{" "}
            <Text style={{ color: Colors.PRIMARY, fontWeight: "600" }}>
              Term of Service and Privacy Policy
            </Text>
          </Text>
        </View>
        <BigButton
          text={"Sign Up"}
          backgroundColor={Colors.PRIMARY}
          textColors={Colors.WHITE}
          icon={undefined}
          onPress={() => {
            handleLogin();
          }}
          textStyle={FontSize.REGULAR}
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
