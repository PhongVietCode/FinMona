import { Header } from "@/Components/Header/Header";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ArrowLeftLong from "../../../assets/icons/arrow-left.svg";
import { Colors, FontSize } from "@/Theme/Variables";
import { gStyles } from "@/Theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import {
  Transaction,
  moneyConvert,
} from "@/Components/TransactionItem/TransactionItem";
import { BigButton } from "@/Components/BigButton/BigButton";
import { RootScreens } from "..";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Store";
import { BottomSheet } from "react-native-btr";
import { useDeleteRecordMutation } from "@/Services";
export const TransacDetail = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const record = useSelector((state: RootState) => state.editRecord.record);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteRecord] = useDeleteRecordMutation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      <Header
        left={
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftLong fill={Colors.TEXT_BOLD} />
          </Pressable>
        }
        right={<Text style={gStyles.title2}>Detail Transaction</Text>}
        center={<View></View>}
      />
      <View
        style={{
          backgroundColor: Colors.STROKE,
          display: "flex",
          alignItems: "center",
          paddingVertical: 16,
        }}
      >
        <Text style={[gStyles.title1, { fontSize: 32 }]}>
          {moneyConvert(record.amount)}
        </Text>
        <Text style={[gStyles.title3, { color: Colors.LIGHT_GRAY }]}>
          {record.dateCreated}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          marginTop: 16,
          flexGrow: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 16,
            borderWidth: 1,
            borderColor: Colors.LIGHT_GRAY,
            borderRadius: 18,
            width: '100%'
          }}
        >
          <View style={[styles.typeContainer]}>
            <Text style={styles.typeLabel}>Type</Text>
            <Text style={styles.typeContent}>
              {record.isIncome ? "Income" : "Expense"}
            </Text>
          </View>
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>Category</Text>
            <Text style={styles.typeContent}>
              {record.category.split("_")[1]}
            </Text>
          </View>
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>Wallet</Text>
            <Text style={styles.typeContent}>
              {record.moneySource.split("_")[0]}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: Colors.LIGHT_GRAY,
            marginVertical: 16,
          }}
        ></View>
        <View style={{ flexGrow: 1 }}>
          <Text style={[gStyles.regular1, { color: Colors.LIGHT_GRAY }]}>
            Description:{" "}
          </Text>
          <Text
            style={{ color: Colors.TEXT_BOLD, fontWeight: "500", fontSize: 18 }}
          >
            {record.description}
          </Text>
        </View>
        <View style={{ gap: 10, paddingVertical: 10 }}>
          <BigButton
            text={"Edit"}
            backgroundColor={Colors.PRIMARY}
            textColors={Colors.WHITE}
            icon={undefined}
            onPress={() => {
              navigation.navigate(RootScreens.EDITTRANS);
            }}
            textStyle={FontSize.REGULAR}
          />
          <BigButton
            text={"Delete"}
            backgroundColor={Colors.WARN}
            textColors={Colors.WHITE}
            icon={undefined}
            onPress={() => setShowDelete(!showDelete)}
            textStyle={FontSize.REGULAR}
          />
        </View>
        <BottomSheet
          visible={showDelete}
          onBackdropPress={() => setShowDelete(false)}
        >
          <View
            style={{
              flex: 0.3,
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
            <ScrollView style={{ width: "100%" }}>
              <Text
                style={{ fontSize: 19, fontWeight: "600", textAlign: "center" }}
              >
                Delete this record permanently ?
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.LIGHT_GRAY,
                  textAlign: "center",
                }}
              >
                This step can not be undone
              </Text>
              <View style={{ width: "100%", marginTop: 27 }}>
                <BigButton
                  text={"Delete"}
                  backgroundColor={Colors.WARN}
                  textColors={Colors.WHITE}
                  icon={undefined}
                  onPress={() => {
                    deleteRecord({ idReport: record.id })
                      .unwrap()
                      .then((fullfilled) => {
                        navigation.goBack();
                      })
                      .catch((rejected) => {});
                  }}
                  textStyle={FontSize.REGULAR}
                ></BigButton>
                <BigButton
                  text={"Cancle"}
                  backgroundColor={Colors.STROKE}
                  textColors={Colors.LIGHT_GRAY}
                  icon={undefined}
                  onPress={() => {
                    navigation.goBack();
                  }}
                  textStyle={FontSize.REGULAR}
                ></BigButton>
              </View>
            </ScrollView>
          </View>
        </BottomSheet>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  typeContainer: {
    display: "flex",
    alignItems: "center",
    flex:1,
  },
  typeLabel: {
    ...gStyles.title3,
    color: Colors.LIGHT_GRAY,
  },
  typeContent: {
    ...gStyles.title2,
    color: Colors.TEXT_BOLD,
  },
});
