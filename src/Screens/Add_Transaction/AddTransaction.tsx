import { RootStackParamList } from "@/Navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
} from "react-native";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { Colors, FontSize } from "@/Theme/Variables";
import { Header } from "@/Components/Header/Header";
import { gStyles } from "@/Theme";
import { ReactNode, useState } from "react";
import { FlatList, Input, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputItem } from "@/Components/Input/InputItem";
import DateTimePicker from "@react-native-community/datetimepicker";
import CanlendarIcon from "../../../assets/icons/calender-alt-1.svg";
import { TextInput } from "react-native-paper";
import { TransacCategory } from "@/Components/TransactionItem/TransactionItem";
import { Switch } from "react-native-paper";
import { BigButton } from "@/Components/BigButton/BigButton";
import { BottomSheetItemList } from "@/Components/BottomSheet/BottomSheetItemList";
import { BottomSheet } from "react-native-btr";
import { TransacItem } from "@/Components/TransacItem/TransacItem";
import BankIcon from "../../../assets/icons/bank.svg";
import CirclePlus from "../../../assets/icons/circle-plus.svg";
import { DropDown } from "@/Components/DropDown/DropDown";
export enum MoneySource {
  Bank,
  Cash,
  Card,
  Borrow,
}
export const AddTransaction = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const types = ["Income", "Expense"];
  const [transType, setTransType] = useState(types[0]);
  const [date, setDate] = useState(new Date(Date.now()));
  const [open, setOpen] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const getMoneySource = (src: any) => {
    if (src == MoneySource.Bank) return "Bank";
    if (src == MoneySource.Cash) return "Cash";
    if (src == MoneySource.Card) return "Card";
    if (src == MoneySource.Borrow) return "Borrow";
    return "";
  };
  const getCategory = (cat: any) => {
    if (cat == TransacCategory.Food) return "Food";
    if (cat == TransacCategory.Shopping) return "Shopping";
    if (cat == TransacCategory.Party) return "Party";
    if (cat == TransacCategory.Transport) return "Transport";
    return "";
  };
  const [form, setForm] = useState({
    date: "",
    moneySource: Number,
    category: "",
    amount: "",
    description: "",
    repeat: Boolean,
  });
  const [showMoneySource, setShowMoneySource] = useState(false);
  const [showMoneyCategory, setshowMoneyCategory] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [moneySourceList, setMoneySourceList] = useState([
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
  ]);
  const [moneyCatList, setMoneyCatList] = useState([
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
    {
      icon: [
        <BankIcon fill={Colors.PRIMARY} />,
        <BankIcon fill={Colors.WHITE} />,
      ],
      lable: "Bank",
    },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={
          <ArrowLeft
            fill={Colors.TEXT_BOLD}
            onPress={() => navigation.goBack()}
          />
        }
        center={null}
        right={<Text style={[gStyles.title1]}>{transType}</Text>}
      />
      <ScrollView
        contentContainerStyle={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <View style={styles.body}>
          <View>
            <FlatList
              scrollEnabled={false}
              horizontal
              style={[styles.tabContainer]}
              data={types}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => setTransType(types[index])}
                  style={[
                    styles.tabBtn,
                    {
                      backgroundColor:
                        transType == item ? Colors.PRIMARY : Colors.TRANSPARENT,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color:
                          transType == item ? Colors.WHITE : Colors.TEXT_BOLD,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>
          <View>
            <InputItem
              showKeyboard={false}
              value={date.toString()}
              label="Date"
              onChangeText={() => {
                setForm({ ...form, date: date.toString() });
              }}
              placeholder="dd/mm/yyyy"
              right={
                <TextInput.Icon
                  icon={"calendar"}
                  color={Colors.LIGHT_GRAY}
                  onPress={(e) => {
                    setOpen((prev) => !prev);
                    e.stopPropagation();
                  }}
                />
              }
            />
          </View>

          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <InputItem
              showKeyboard={false}
              value={getMoneySource(form.moneySource)}
              label="Money Source*: "
              onChangeText={(moneySource: any) =>
                setForm({ ...form, moneySource })
              }
              placeholder="Bank"
              right={
                <TextInput.Icon
                  icon={"chevron-down"}
                  color={Colors.LIGHT_GRAY}
                  onPress={(e) => {
                    console.log("phong");
                    setShowMoneySource(true);
                  }}
                />
              }
            />
            <InputItem
              showKeyboard={false}
              value={getCategory(form.category)}
              label="Category*: "
              onChangeText={(category: any) => setForm({ ...form, category })}
              placeholder="Shopping"
              right={
                <TextInput.Icon
                  icon={"chevron-down"}
                  color={Colors.LIGHT_GRAY}
                  onPress={(e) => {
                    setshowMoneyCategory(true);
                  }}
                />
              }
            />
          </View>
          <View>
            <InputItem
              showKeyboard={true}
              value={form.amount}
              label="How much? *: "
              onChangeText={(amount: any) => setForm({ ...form, amount })}
              placeholder="000.000đ"
              right={null}
            />
          </View>
          <View>
            <InputItem
              showKeyboard={true}
              value={form.description}
              label="Description*: "
              onChangeText={(description: any) =>
                setForm({ ...form, description })
              }
              placeholder="Note something"
              right={null}
            />
          </View>
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexDirection: "row",
              flex: 1,
            }}
          >
            <View style={{ gap: 5 }}>
              <Text style={{ fontWeight: "600", fontSize: 21 }}>Repeat</Text>
              <Text style={{ color: Colors.LIGHT_GRAY }}>
                Repeat this transction by your own time
              </Text>
            </View>
            <Switch
              value={isRepeated}
              onValueChange={() => {
                setIsRepeated(!isRepeated);
                setShowRepeat(!isRepeated);
              }}
            />
          </View>
          <View style={{ paddingVertical: 18, gap: 16 }}>
            <BigButton
              text={"Save"}
              backgroundColor={Colors.PRIMARY}
              textColors={Colors.WHITE}
              icon={undefined}
              onPress={() => navigation.goBack()}
              textStyle={FontSize.REGULAR}
            ></BigButton>
            <BigButton
              text={"Cancle"}
              backgroundColor={Colors.TRANSPARENT}
              textColors={Colors.LIGHT_GRAY}
              icon={undefined}
              onPress={() => navigation.goBack()}
              textStyle={FontSize.REGULAR}
            ></BigButton>
          </View>
          <BottomSheetItemList
            label="Money Source: "
            show={showMoneySource}
            setShow={() => setShowMoneySource(!showMoneySource)}
            list={moneySourceList}
          />
          <BottomSheetItemList
            label="Category: "
            show={showMoneyCategory}
            setShow={() => setshowMoneyCategory(!showMoneyCategory)}
            list={moneyCatList}
          />
          <BottomSheet
            visible={showRepeat}
            onBackdropPress={() => setShowRepeat(false)}
          >
            <View
              style={{
                flex: 0.5,
                backgroundColor: Colors.BACKGROUND,
                borderRadius: 20,
                padding: 10,
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  width: "30%",
                  height: 5,
                  backgroundColor: Colors.TEXT_LIGHT,
                  borderRadius: 50,
                }}
              />
              <View style={{flex: 1}}>
                <DropDown />
              </View>
              <BigButton
                text={"Done"}
                backgroundColor={Colors.PRIMARY}
                textColors={Colors.WHITE}
                icon={undefined}
                onPress={() => setShowRepeat(false)}
                textStyle={FontSize.REGULAR}
              ></BigButton>
            </View>
          </BottomSheet>
          {open && (
            <DateTimePicker
              value={date}
              mode={"date"}
              is24Hour={true}
              onChange={(event, date) => {
                setOpen(false);
                if (date) {
                  setDate(date);
                }
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: Colors.BACKGROUND,
    justifyContent: "flex-start",
    flexDirection: "column",
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tabContainer: {
    backgroundColor: Colors.STROKE,
    alignSelf: "center",
    padding: 5,
    borderRadius: 32,
  },
  tabBtn: {
    paddingVertical: 10,
    paddingHorizontal: Dimensions.get("screen").width / 8,
    borderRadius: 40,
  },
  tabText: {
    fontWeight: "600",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: Colors.BACKGROUND,
  },
});
