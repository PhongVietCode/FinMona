import { BottomSheetItemList } from "@/Components/BottomSheet/BottomSheetItemList";
import { Header } from "@/Components/Header/Header";
import { InputItem } from "@/Components/Input/InputItem";
import { Transaction } from "@/Components/TransactionItem/TransactionItem";
import { Tag, useEditRecordMutation, useLazyGetAllTagsQuery } from "@/Services";
import { ScrollView, View } from "native-base";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text } from "react-native";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { gStyles } from "@/Theme";
import { Colors, FontSize } from "@/Theme/Variables";
import { TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/Store";
import { BigButton } from "@/Components/BigButton/BigButton";
import { setEditRecord } from "@/Store/reducers";
import { BottomSheet } from "react-native-btr";
export const EditTransaction = () => {
  const editingRecord = useSelector((state: RootState) => state.editRecord);
  const dispatch = useDispatch();
  const [form, setForm] = useState<
    Omit<Transaction, "id" | "dateCreated" | "user">
  >({
    isIncome: editingRecord.record.isIncome,
    amount: editingRecord.record.amount,
    category: editingRecord.record.category,
    moneySource: editingRecord.record.moneySource,
    description: editingRecord.record.description,
  });
  const [fetchTag, { data, isLoading, isFetching }] = useLazyGetAllTagsQuery();
  const [showMoneySource, setShowMoneySource] = useState(false);
  const [showMoneyCategory, setshowMoneyCategory] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const [editRecord] = useEditRecordMutation();
  const [showDelete, setShowDelete] =useState(false)
  useEffect(() => {
    fetchTag({ id: user.id });
  }, [data]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={{ backgroundColor: Colors.WHITE, height: "100%" }}>
      <Header
        left={
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeft fill={Colors.TEXT_BOLD} />
          </Pressable>
        }
        center={null}
        right={<Text style={[gStyles.title1]}>Edit transction</Text>}
      />
      <ScrollView
        style={{
          display: "flex",
          paddingHorizontal: 16,
          backgroundColor: Colors.WHITE,
          flexDirection: "column",
        }}
      >
        <InputItem
          showKeyboard={true}
          label="Amount of money:"
          onChangeText={(val) => {
            setForm({ ...form, amount: Number(val) });
          }}
          placeholder={String(editingRecord.record.amount)}
          right={undefined}
          value={String(form.amount)}
        />

        <InputItem
          showKeyboard={false}
          value={form.moneySource.split("_")[0]}
          label="Money Source*: "
          onChangeText={(moneySource: any) => setForm({ ...form, moneySource })}
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
        <InputItem
          showKeyboard={true}
          label="Description:"
          onChangeText={(val) => {
            setForm({ ...form, description: val });
          }}
          placeholder={String(editingRecord.record.description)}
          right={undefined}
          value={String(form.description)}
        />
        <View style={{ marginTop: 10 }}>
          <BigButton
            text={"Save"}
            backgroundColor={Colors.PRIMARY}
            textColors={Colors.WHITE}
            icon={undefined}
            onPress={() => {
              editRecord({ id: editingRecord.record.id, body: form });
              dispatch(
                setEditRecord({
                  ...form,
                  id: editingRecord.record.id,
                  dateCreated: editingRecord.record.dateCreated,
                  user: editingRecord.record.user,
                })
              );
              navigation.goBack();
            }}
            textStyle={FontSize.REGULAR}
          />
          <View style={{ margin: 8 }}></View>
          <BigButton
            text={"Cancle"}
            backgroundColor={Colors.TRANSPARENT}
            textColors={Colors.LIGHT_GRAY}
            icon={undefined}
            onPress={() => navigation.goBack()} // can use on go back
            textStyle={FontSize.REGULAR}
          />
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
          editItemChoosen={editingRecord.record.moneySource}
        />
        <BottomSheetItemList
          label="Category: "
          show={showMoneyCategory}
          setShow={() => setshowMoneyCategory(!showMoneyCategory)}
          list={data?.filter((item) => item.type === "Category")}
          onPress={(choosenItem: Tag) =>
            setForm({ ...form, category: choosenItem.title })
          }
          editItemChoosen={editingRecord.record.category}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
