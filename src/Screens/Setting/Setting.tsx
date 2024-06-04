import { Header } from "@/Components/Header/Header";
import { gStyles } from "@/Theme";
import { Colors, FontSize } from "@/Theme/Variables";
import React, { FunctionComponent } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
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
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BudgetIcon from "../../../assets/icons/Initiate Money Transfer.svg";
import Manager from "../../../assets/icons/manager.svg";
import CreditCardIcon from '../../../assets/icons/credit-cards.svg'
export const Setting: FunctionComponent = () => {
  const userImg = ("https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      <Header
        left={<View></View>}
        right={<View></View>}
        center={<Text style={gStyles.title1}>Setting</Text>}
      />
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 20,
              flexGrow: 1,
            }}
          >
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
                source={{uri: userImg}}
                resizeMode="cover"
                style={{ flex: 1, width: "100%", transform: [{scale: 1.2}] }}
              />
            </View>
            <View style={{ gap: 10, flexShrink: 1 }}>
              <Text
                style={[
                  gStyles.title3,
                  { fontSize: 18, color: Colors.LIGHT_GRAY },
                ]}
              >
                Username
              </Text>
              <Text
                style={[gStyles.title2]}
                ellipsizeMode="tail"
                numberOfLines={1}
              >
                {user.name}
              </Text>
            </View>
          </View>
          {/* <View>
            <Pressable onPress={() => navigation.navigate(RootScreens.UPDATE)}>
              <Pencil fill={Colors.TEXT_BOLD} />
            </Pressable>
          </View> */}
        </View>
        <ScrollView style={{ flexGrow: 1 }}>
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 10,
            }}
          >
            {/* <Text style={[gStyles.title3, { fontSize: 18 }]}>Setting: </Text>
            {[...Array(4).keys()].map((i) => (
              <SettingItem
                icon={<Pencil fill={Colors.TEXT_BOLD} />}
                label={"Setting item"}
                des={"Setting item"}
                rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
                onPress={() => {}}
                key={i}
              />
            ))} */}
            <Text style={[gStyles.title3, { fontSize: 18, marginVertical: 8 }]}>
              Account:{" "}
            </Text>
            <SettingItem
              icon={<Pencil fill={Colors.TEXT_BOLD} />}
              label={"Account Information"}
              des={"Change your personal information"}
              rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
              onPress={() => {
                navigation.navigate(RootScreens.UPDATE);
              }}
            />
            <Text style={[gStyles.title3, { fontSize: 18, marginVertical: 8 }]}>
              Category/Money Source:{" "}
            </Text>
            <SettingItem
              icon={<BudgetIcon fill={Colors.TEXT_BOLD} />}
              label={"Set up your budget"}
              des={"Budget Limit and Currency Type"}
              rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
              onPress={() => {
                navigation.navigate(RootScreens.BUDGET);
              }}
            />
            <SettingItem
              icon={<CreditCardIcon fill={Colors.TEXT_BOLD} />}
              label={"Create your own tag"}
              des={"Specify your record type with tag"}
              rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
              onPress={() => navigation.navigate(RootScreens.TAG)}
            />
            <Text style={[gStyles.title3, { fontSize: 18, marginVertical: 8 }]}>
              User feedback:{" "}
            </Text>
            <SettingItem
              icon={<Manager fill={Colors.TEXT_BOLD} />}
              label={"Send us your feedback"}
              des={"Your feedback will help us to improve our app faster"}
              rightIcon={<ArrowRight width={18} fill={Colors.TEXT_BOLD} />}
              onPress={() => navigation.navigate(RootScreens.FEEDBACK)}
            />
          </View>

          <BigButton
            text={"Logout"}
            backgroundColor={Colors.STROKE}
            textColors={Colors.WARN}
            icon={undefined}
            onPress={() => {
              Alert.alert(
                "Do you really want to logout ?",
                "This can't be undone",
                [
                  {
                    text: "Ok",
                    onPress: () => {
                      AsyncStorage.clear();
                      // navigation.navigate(RootScreens.LOGIN);
                      navigation.reset({
                        index: 0,
                        routes: [{name:RootScreens.LOGIN}]
                      })
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                ]
              );
            }}
            textStyle={FontSize.LARGE}
          ></BigButton>
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
