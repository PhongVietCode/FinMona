import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  SafeAreaView,
  Button,
  Pressable,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";
export const Onboard: FunctionComponent = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const img1 = require("../../../assets/onboard_image/img1.png");
  const img2 = require("../../../assets/onboard_image/img2.png");
  const img3 = require("../../../assets/onboard_image/img3.png");
  const imgArray = [img1, img2, img3];
  const titleArray = [
    "CONTROL YOUR PAYMENT,\nCONTROL YOUR FUTURE",
    "BALANCE YOUR BUDGET,\nBALANCE YOUR LIFE",
    "SAVE BETTER,\nSHARE TOGETHER",
  ];
  const contextArray = [
    "Help you to be aware of what you are paying for by keeping track of your payment",
    "Help you to control your money flow and notify you when you reach pocket limitation",
    "Share with your friends about your saving achievements and learn more about money - saving strategy.",
  ];
  const [index, setIndex] = useState(0);
  const [img, setImg] = useState(imgArray[index]);
  const [title, setTitle] = useState(titleArray[index]);
  const [context, setContext] = useState(contextArray[index]);
  useEffect(() => {
    setImg(imgArray[index]);
    setTitle(titleArray[index]);
    setContext(contextArray[index]);
  }, [index]);

  const changeImage = () => {
    if (index == 2) {
      // navigation.navigate(RootScreens.LOGIN);
      navigation.reset({
        index: 0,
        routes: [{name:RootScreens.LOGIN}]
      })
    } else {
      setIndex((oldIndex) => oldIndex + 1);
    }
  };
  const skipOnboard = () => {
    setIndex(2);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          width: "100%",
          display: "flex",
          gap: 24,
        }}
      >
        <View style={styles.header}>
          <ImageBackground
            resizeMode="contain"
            source={img}
            style={styles.img}
          ></ImageBackground>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View style={[styles.circle, index == 0 ? styles.active : null]} />
            <View style={[styles.circle, index == 1 ? styles.active : null]} />
            <View style={[styles.circle, index == 2 ? styles.active : null]} />
          </View>
        </View>
        <View style={styles.body}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.context}>{context}</Text>
        </View>
      </Animated.View>
      <View style={styles.footer}>
        {index == 2 ? (
          <>
            <Pressable
              onPress={changeImage}
              style={[styles.myBtn, styles.startBtn]}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "500",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Get Started!
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              onPress={skipOnboard}
              style={styles.myBtn}
            >
              <Text
                style={{ color: "#908EAB", fontSize: 20, fontWeight: "500" }}
              >
                Skip
              </Text>
            </Pressable>
            <Pressable
              onPress={changeImage}
              style={[styles.myBtn, styles.nextBtn]}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
                Next
              </Text>
            </Pressable>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fffff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
  },
  circle: {
    width: 10,
    aspectRatio: 1,
    borderRadius: 50,
    marginHorizontal: 4,
    borderColor: "#516EFC",
    borderWidth: 1,
  },
  active: {
    backgroundColor: "#516EFC",
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  context: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  body: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    gap: 16,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  myBtn: {
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
  },
  nextBtn: {
    backgroundColor: "#516EFC",
    borderRadius: 10,
  },
  startBtn: {
    backgroundColor: "#516EFC",
    flex: 1,
    marginHorizontal: 20,
  },
});
