import { Checkbox, Stack } from "native-base";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { gStyles } from "../../Theme";
import { UserInput } from "@/Components";
import { Colors, FontSize } from "@/Theme/Variables";
import { BigButton } from "@/Components/BigButton/BigButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
import {
  UserSignInInfo,
  UserUpdateInfo,
  useSignInUserMutation,
  useUpdateUserMutation,
} from "@/Services";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { Header } from "@/Components/Header/Header";
import { InputItem } from "@/Components/Input/InputItem";
export const UpdateUser = () => {
  const [checkPass, setCheckPass] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isChecked, setisChecked] = useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [updateUser] = useUpdateUserMutation();

  const user = useSelector((state: RootState) => state.user);
  const [form, setForm] = useState<UserUpdateInfo>({
    name: user.name,
    email: user.email,
    password: user.password,
    avatar: user.avatar,
  });
  const handleUpdate = () => {
    if (form.name.length == 0 || form.email.length == 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
    updateUser({ id: user.id, body: form })
      .unwrap()
      .then((fullfilled: any) => {
        if (fullfilled["statusCode"] == "201") {
          navigation.goBack();
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
  };
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Header
        left={<View></View>}
        right={<View></View>}
        center={<Text style={gStyles.title1}>Update Information</Text>}
      />
      <View style={{ paddingHorizontal: 16, flexGrow: 1 }}>
        <ScrollView contentContainerStyle={{ gap: 16 }}>
          <View>
            <InputItem
              showKeyboard={true}
              label="Name*:"
              onChangeText={(val) => {
                setForm({ ...form, name: val });
              }}
              placeholder={form.name}
              right={undefined}
              value={form.name}
            />
            {isEmpty && form.name.length == 0 && (
              <Text style={{ marginTop: 4, color: Colors.WARN }}>
                *Not empty
              </Text>
            )}
          </View>
          <View>
            <InputItem
              showKeyboard={true}
              label="Email*:"
              onChangeText={(val) => {
                setForm({ ...form, email: val });
              }}
              placeholder={form.email}
              right={undefined}
              value={form.email}
            />
            {isEmpty && form.email.length == 0 && (
              <Text style={{ marginTop: 4, color: Colors.WARN }}>
                *Not empty
              </Text>
            )}
          </View>
          <View style={{ width: "100%" }}>
            <InputItem
              showKeyboard={true}
              label="Avatar Link (optional):"
              onChangeText={(val) => {
                setForm({ ...form, avatar: val });
              }}
              placeholder={form.avatar}
              right={undefined}
              value={form.avatar}
            />
          </View>
        </ScrollView>
        <View style={{gap: 10, paddingVertical: 10}}>
          <BigButton
            text={"Save"}
            backgroundColor={Colors.PRIMARY}
            textColors={Colors.WHITE}
            icon={undefined}
            onPress={() => {
              handleUpdate();
            }}
            textStyle={FontSize.REGULAR}
          />
          <BigButton
            text={"Cancle"}
            backgroundColor={Colors.STROKE}
            textColors={Colors.LIGHT_GRAY}
            icon={undefined}
            onPress={() => {
              navigation.goBack();
            }}
            textStyle={FontSize.REGULAR}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
