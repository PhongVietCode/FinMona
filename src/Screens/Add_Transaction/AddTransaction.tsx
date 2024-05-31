import { RootStackParamList } from "@/Navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, Platform, Pressable, StyleSheet, Text, View } from "react-native";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { Colors, FontSize } from "@/Theme/Variables";
import { Header } from "@/Components/Header/Header";
import { gStyles } from "@/Theme";
import { useEffect, useState } from "react";
import { FlatList, Input, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputItem } from "@/Components/Input/InputItem";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-paper";
import { Switch } from "react-native-paper";
import { BigButton } from "@/Components/BigButton/BigButton";
import { BottomSheetItemList } from "@/Components/BottomSheet/BottomSheetItemList";
import { BottomSheet } from "react-native-btr";
import BankIcon from "../../../assets/icons/bank.svg";
import { DropDown } from "@/Components/DropDown/DropDown";
import { Transaction } from "@/Components/TransactionItem/TransactionItem";
import { Tag, useAddRecordMutation, useLazyGetAllTagsQuery } from "@/Services";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import * as Sentry from '@sentry/react-native' 
export const AddTransaction = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const initialForm: Omit<Transaction, "id" | "dateCreated" | "user"> = {
    isIncome: true,
    // repeat: false,
    amount: 0,
    category: "",
    moneySource: "",
    description: "",
  };
  const types = ["Income", "Expense"];
  const [transType, setTransType] = useState(types[0]);
  const [date, setDate] = useState(new Date(Date.now()));
  const [open, setOpen] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [form, setForm] =
    useState<Omit<Transaction, "id" | "dateCreated" | "user">>(initialForm);

  const [showMoneySource, setShowMoneySource] = useState(false);
  const [showMoneyCategory, setshowMoneyCategory] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [addRecord, addRecordResult] = useAddRecordMutation();

  const [fetchTag, { data, isLoading, isFetching }] = useLazyGetAllTagsQuery();
  const user = useSelector((state: RootState) => state.user);

  const [isEmpty, setIsEmpty] = useState(false);
  useEffect(() => {
    fetchTag({ id: user.id });
  }, [data]);
  const handleSave = (e: any) => {
    if (form.moneySource == "" || form.category == "" || form.amount == 0) {
      setIsEmpty(true);
    } else {
      navigation.goBack();
      setIsEmpty(false);
      addRecord({ id: user.id, body: form });
      setForm(initialForm);
      Sentry.metrics.increment("measurements.stall_count", 1, {
        tags: { os: Platform.OS},
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        left={
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft fill={Colors.TEXT_BOLD} />
          </Pressable>
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
                  onPress={() => {
                    setTransType(types[index]);
                    setForm({ ...form, isIncome: Boolean(1 - index) });
                  }}
                  style={[
                    styles.tabBtn,
                    {
                      backgroundColor:
                        transType == item ? Colors.PRIMARY : Colors.TRANSPARENT,
                    },
                  ]}
                  key={index}
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
          <View></View>
          <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <View style={{ flex: 1 }}>
              <InputItem
                showKeyboard={false}
                value={form.moneySource.split("_")[0]}
                label="Money Source*: "
                onChangeText={(moneySource: any) =>
                  setForm({ ...form, moneySource })
                }
                placeholder="...."
                right={
                  <TextInput.Icon
                    icon={"chevron-down"}
                    color={Colors.LIGHT_GRAY}
                    onPress={(e) => {
                      setShowMoneySource(true);
                    }}
                  />
                }
              />
              {isEmpty && form.moneySource.length == 0 ? (
                <Text style={{ color: Colors.WARN }}>Must not empty</Text>
              ) : (
                <></>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <InputItem
                showKeyboard={false}
                value={form.category.split("_")[0]}
                label="Category*: "
                onChangeText={(category: any) => setForm({ ...form, category })}
                placeholder="...."
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
              {isEmpty && form.category.length == 0 ? (
                <Text style={{ color: Colors.WARN }}>Must not empty</Text>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View>
            <InputItem
              showKeyboard={true}
              value={String(form.amount)}
              label="How much? *: "
              onChangeText={(amount: any) =>
                setForm({ ...form, amount: Number(amount) })
              }
              placeholder="xxx.xxxd"
              right={null}
            />
          </View>
          <View>
            <InputItem
              showKeyboard={true}
              value={form.description}
              label="Description: "
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
                // setForm({...form})
              }}
            />
          </View>
          <View style={{ paddingVertical: 18, gap: 16 }}>
            <BigButton
              text={"Save"}
              backgroundColor={Colors.PRIMARY}
              textColors={Colors.WHITE}
              icon={undefined}
              onPress={(e: any) => {
                handleSave(e);
              }}
              textStyle={FontSize.REGULAR}
            ></BigButton>
            <BigButton
              text={"Cancle"}
              backgroundColor={Colors.TRANSPARENT}
              textColors={Colors.LIGHT_GRAY}
              icon={undefined}
              onPress={() => {
                navigation.goBack();
                setForm(initialForm);
              }}
              textStyle={FontSize.REGULAR}
            ></BigButton>
          </View>
          <BottomSheetItemList
            label="Money Source: "
            show={showMoneySource}
            setShow={() => setShowMoneySource(!showMoneySource)}
            list={data?.filter((item) => item.type === "Money Source")}
            onPress={(choosenItem: Tag) =>
              setForm({
                ...form,
                moneySource: choosenItem?.title,
              })
            }
          />
          <BottomSheetItemList
            label="Category: "
            show={showMoneyCategory}
            setShow={() => setshowMoneyCategory(!showMoneyCategory)}
            list={data?.filter((item) => item.type === "Category")}
            onPress={(choosenItem: Tag) =>
              setForm({ ...form, category: choosenItem.title })
            }
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
              <View style={{ flex: 1 }}>
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
