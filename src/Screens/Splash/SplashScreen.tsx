import { RootStackParamList } from "@/Navigation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { Image, Text } from "react-native";
import { SafeAreaView } from "react-native";
import { RootScreens } from "..";
import { useDispatch } from "react-redux";
import { setEmail, setToken } from "@/Store/reducers";
import { Colors } from "@/Theme/Variables";
import LottieView from 'lottie-react-native';
const delay = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));


export const SplashScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const logo = require("../../../assets/logo.png");

  const getToken = async () => {
    AsyncStorage.getItem("email")
      .then((onfullfilled: any) => {
        if (onfullfilled == null) {
          navigation.navigate(RootScreens.ONBOARD);
        } else {
          dispatch(setEmail(onfullfilled.toString()));
        }
      })
      .catch((rejected: any) => {
        console.log(rejected);
      });
    AsyncStorage.getItem("token")
      .then(async (onfullfilled: any) => {
        if (onfullfilled == null) {
          navigation.navigate(RootScreens.ONBOARD);
        } else {
          dispatch(setToken(onfullfilled.toString()));
          await delay(400);
          navigation.navigate(RootScreens.LOAD);
        }
      })
      .catch((rejected: any) => {
        console.log(rejected);
      });
  };
  useEffect(() => {
    getToken();
    
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.WHITE, justifyContent:'flex-start', alignItems:'center'}}>
      <Image source={logo} />
      <LottieView autoPlay
        style={{
          height: 150,
          backgroundColor: Colors.TRANSPARENT,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../../assets/anim/loading_anim2.json')}/>
    </SafeAreaView>
  );
};
