import { Header } from "@/Components/Header/Header";
import { gStyles } from "@/Theme";
import { Colors, FontSize } from "@/Theme/Variables";
import React, { FunctionComponent } from "react";
import { ImageBackground, SafeAreaView, Text, View } from "react-native";
import Pencil from "../../../assets/icons/pencil.svg";
import { FlatList } from "native-base";
import { NotificationItem } from "@/Components/NotificationItem/NotificationItem";
import { SettingItem } from "@/Components/SettingItem/SettingItem";
import ArrowRight from "../../../assets/icons/chevron-right.svg";
import { BigButton } from "@/Components/BigButton/BigButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

export const Setting: FunctionComponent = () => {
  const userImg = require("../../../assets/user_img.png");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      <Header
        left={<View></View>}
        right={
          <View>
          </View>
        }
        center={<Text style={gStyles.title1}>Setting</Text>}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <View
            style={{
              width: 70,
              aspectRatio: 1,
              borderRadius: 50,
              overflow: "hidden",
              borderWidth: 2,
              borderColor: Colors.PRIMARY,
              padding: 2,
            }}
          >
            <ImageBackground
              source={userImg}
              resizeMode="contain"
              style={{ flex: 1, width: "100%" }}
            />
          </View>
          <View style={{ gap: 10 }}>
            <Text
              style={[
                gStyles.title3,
                { fontSize: 18, color: Colors.LIGHT_GRAY },
              ]}
            >
              Username
            </Text>
            <Text style={gStyles.title2}>Tran Quoc Phong</Text>
          </View>
        </View>
        <Pencil fill={Colors.TEXT_BOLD} />
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          borderRadius: 10,
          overflow: "hidden",
          marginTop: 10,
        }}
      >
        <Text style={[gStyles.title3, { fontSize: 18 }]}>Setting: </Text>
        {[...Array(4).keys()].map((i) => (
          <SettingItem
            icon={<Pencil fill={Colors.TEXT_BOLD} />}
            label={"Setting item"}
            des={"Setting item"}
            rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
            onPress={() => {}}
            key={i}
          />
        ))}

        <Text style={[gStyles.title3, { fontSize: 18, marginVertical: 8 }]}>
          Category/Account:{" "}
        </Text>
        {[...Array(1).keys()].map((i) => (
          <SettingItem
            icon={<Pencil fill={Colors.TEXT_BOLD} />}
            label={"Setting item"}
            des={"Setting item"}
            rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
            onPress={() => {}}
            key={i}
          />
        ))}
        <SettingItem
          icon={<Pencil fill={Colors.TEXT_BOLD} />}
          label={"Add More Icon"}
          des={"This feature is for Premium User"}
          rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
          onPress={() => navigation.navigate(RootScreens.TAG)}
        />
        <BigButton
          text={"Logout"}
          backgroundColor={Colors.WARN}
          textColors={Colors.WHITE}
          icon={undefined}
          onPress={undefined}
          textStyle={FontSize.REGULAR}
        ></BigButton>
      </View>
    </SafeAreaView>
  );
};
