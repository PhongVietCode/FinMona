import { Header } from "@/Components/Header/Header";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { gStyles } from "@/Theme";
import { Colors, FontSize } from "@/Theme/Variables";
import { InputItem } from "@/Components/Input/InputItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store";
import { setCurrencyType, setLimitBudget } from "@/Store/reducers/budget";
import { BigButton } from "@/Components/BigButton/BigButton";
import { useState } from "react";
import { moneyConvert } from "@/Components/TransactionItem/TransactionItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BudgetScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const budget = useSelector((state: RootState) => state.budget);
  const dispatch = useDispatch();
  const [limitBudget, setLimit] = useState(budget.limitBudget);
  const [currencyType, setType] = useState(budget.currencyType);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      <Header
        left={
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft fill={Colors.TEXT_BOLD} />
          </Pressable>
        }
        right={<></>}
        center={<Text style={gStyles.title1}>Budget Setting</Text>}
      />
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        <ScrollView style={{ flexGrow: 1 }}>
          <Text style={{ fontSize: 18 }}>
            Current Limit Budget:{" "}
            <Text style={{ fontWeight: "600" }}>
              {moneyConvert(Number(budget.limitBudget))}
            </Text>
          </Text>
          <InputItem
            showKeyboard={true}
            label="Limit budget:"
            onChangeText={(val: string) => {
              setLimit(val);
            }}
            placeholder={"Current:" + limitBudget}
            right={undefined}
            value={limitBudget}
            keyboardType="numeric"
          />
          <InputItem
            showKeyboard={true}
            label="Currency type: "
            onChangeText={(val: string) => {
              setType(val);
            }}
            placeholder={"Current:" + currencyType}
            right={undefined}
            value={currencyType}
          />
        </ScrollView>
        <BigButton
          onPress={() => {
            dispatch(setCurrencyType(currencyType as string));
            dispatch(setLimitBudget(limitBudget as string));
            AsyncStorage.setItem('budget', limitBudget as string)
            navigation.goBack();
          }}
          text={"Done"}
          backgroundColor={Colors.PRIMARY}
          textColors={Colors.WHITE}
          icon={undefined}
          textStyle={FontSize.REGULAR}
        />
        <View style={{height: 10}}></View>
      </View>
    </SafeAreaView>
  );
};
