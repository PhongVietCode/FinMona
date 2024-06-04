import { Colors, FontSize } from "@/Theme/Variables";
import ShoppingIcon from "../../../assets/icons/shopping-bag-14.svg";
import Food from "../../../assets/icons/Food.svg";
import TransportIcon from "../../../assets/icons/school-bus.svg";
import PartyIcon from "../../../assets/icons/party horn.svg";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { gStyles } from "@/Theme";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "@/Screens";
import { useDispatch } from "react-redux";
import { setEditRecord } from "@/Store/reducers";

export interface Transaction {
  id: string;
  isIncome: boolean;
  amount: number;
  category: string;
  moneySource: string;
  dateCreated: string;
  user: string;
  description: string;
}

export const transactionStyle = (type: string) => {
  // type = type.split("_")[1];
  switch (type) {
    case "Shopping":
      return {
        backgroundIconColor: Colors.CAUTION,
        icon: <ShoppingIcon fill={Colors.WHITE} />,
      };
    case "Food":
      return {
        backgroundIconColor: Colors.WARN,
        icon: <Food fill={Colors.WHITE} />,
      };
    case "Transport":
      return {
        backgroundIconColor: Colors.GREEN_80,
        icon: <TransportIcon fill={Colors.WHITE} />,
      };
    case "Party":
      return {
        backgroundIconColor: Colors.PRIMARY,
        icon: <PartyIcon fill={Colors.WHITE} />,
      };
  }
};
export const moneyConvert = (money: Number) => {
  const strMoney = money.toString();
  let res = "";
  let count = 0;
  let index = strMoney.length - 1;
  while (index >= 0) {
    if (count == 3) {
      res = "." + res;
      count = 0;
    }
    res = strMoney[index] + res;
    count++;
    index--;
  }
  return res+' VND';
};
export const TransactionItem = (props: Transaction) => {
  const itemStyle = transactionStyle(props.category.split("_")[1]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        dispatch(setEditRecord(props));
        navigation.navigate(RootScreens.DETAIL);
      }}
    >
      <View
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: itemStyle?.backgroundIconColor, elevation: 4 },
          ]}
        >
          {itemStyle?.icon}
        </View>
        <View
          style={{
            flex: 1,
            marginRight: 2,
          }}
        >
          <Text
            style={[gStyles.title3, { flexWrap: "wrap" }]}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {props.description.length == 0 ? "No description" : props.description} 
          </Text>
          <Text
            style={{ fontSize: FontSize.SMALL - 1, color: Colors.LIGHT_GRAY }}
          >
            Type: {props.category.split("_")[0]}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: props.isIncome ? Colors.GREEN_80 : Colors.WARN,
            fontWeight: "700",
            fontSize: 18,
          }}
        >
          {props.isIncome ? "+ " : "- "}
          {moneyConvert(props.amount)}
        </Text>
        <Text style={{ textAlign: "right", color: Colors.LIGHT_GRAY }}>
          {props.dateCreated}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: Colors.WHITE,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: Colors.LIGHT_GRAY,
    elevation: 2,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
  },
});
