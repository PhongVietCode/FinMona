import { Colors, FontSize } from "@/Theme/Variables";
import ShoppingIcon from "../../../assets/icons/shopping-bag-14.svg";
import Food from "../../../assets/icons/Food.svg";
import TransportIcon from "../../../assets/icons/school-bus.svg";
import PartyIcon from "../../../assets/icons/party horn.svg";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { gStyles } from "@/Theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { useRoute } from "@react-navigation/native";
import { MoneySource } from "@/Screens/Add_Transaction/AddTransaction";
export enum TransacType {
  Income,
  Expense,
}
export enum TransacCategory {
  Food,
  Party,
  Transport,
  Shopping,
}
export interface TransactionProps {
  transac_type: TransacType;
  description: string;
  title: string;
  money: number;
  time: string;
  category: TransacCategory;
  source: MoneySource;
}

export const transactionStyle = (type: TransacCategory) => {
  switch (type) {
    case TransacCategory.Shopping:
      return {
        backgroundIconColor: Colors.CAUTION,
        icon: <ShoppingIcon fill={Colors.WHITE} />,
      };
    case TransacCategory.Food:
      return {
        backgroundIconColor: Colors.WARN,
        icon: <Food fill={Colors.WHITE} />,
      };
    case TransacCategory.Transport:
      return {
        backgroundIconColor: Colors.GREEN_80,
        icon: <TransportIcon fill={Colors.WHITE} />,
      };
    case TransacCategory.Party:
      return {
        backgroundIconColor: Colors.PRIMARY,
        icon: <PartyIcon fill={Colors.WHITE} />,
      };
  }
};
export const moneyConvert = (money: number) => {
  const strMoney = money.toString();
  let res = "";
  let count = 0;
  let index = 0;
  while (index < strMoney.length) {
    if (count == 3) {
      res = "." + res;
      count = 0;
    }
    res = strMoney[index] + res;
    count++;
    index++;
  }
  return res;
};
export const TransactionItem = (props: TransactionProps) => {
  const itemStyle = transactionStyle(props.category);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate(RootScreens.DETAIL, props)}
    >
      <View
        style={{ flexGrow: 1, display: "flex", flexDirection: "row", gap: 10 }}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: itemStyle.backgroundIconColor },
          ]}
        >
          {itemStyle.icon}
        </View>
        <View style={{ display: "flex", justifyContent: "space-between" }}>
          <Text style={gStyles.title3}>{props.title}</Text>
          <Text
            style={{ fontSize: FontSize.SMALL - 1, color: Colors.LIGHT_GRAY }}
          >
            {props.description}
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", justifyContent: "space-between" }}>
        <Text
          style={{
            color:
              props.transac_type == TransacType.Income
                ? Colors.GREEN_80
                : Colors.WARN,
            fontWeight: "600",
            fontSize: 17,
          }}
        >
          {props.transac_type == TransacType.Income ? "+ " : "- "}
          {moneyConvert(props.money)}đ
        </Text>
        <Text style={{ textAlign: "right", color: Colors.LIGHT_GRAY }}>
          {props.time}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.STROKE,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
  },
});
