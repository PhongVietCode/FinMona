import { Header } from "@/Components/Header/Header";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
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
export const TransacDetail = () => {
  // const item = props.route.params;
  // const navigation = props.navigation;
  const route = useRoute();
  const params = route.params as Transaction;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
          {moneyConvert(params.amount)}đ
        </Text>
        <Text style={[gStyles.title3, { color: Colors.LIGHT_GRAY }]}>
          {params.dateCreated}
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
          }}
        >
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>Type</Text>
            <Text style={styles.typeContent}>
              {params.isIncome ? "Income" : "Expense"}
            </Text>
          </View>
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>Category</Text>
            <Text style={styles.typeContent}>
              {params.category.split("_")[1]}
            </Text>
          </View>
          <View style={styles.typeContainer}>
            <Text style={styles.typeLabel}>Wallet</Text>
            <Text style={styles.typeContent}>{params.moneySource.split("_")[0]}</Text>
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
            {params.description}
          </Text>
        </View>
        <View style={{gap: 10, paddingVertical: 10}}>
          <BigButton
            text={"Edit"}
            backgroundColor={Colors.PRIMARY}
            textColors={Colors.WHITE}
            icon={undefined}
            onPress={undefined}
            textStyle={FontSize.REGULAR}
          />
          <BigButton
            text={"Delete"}
            backgroundColor={Colors.WARN}
            textColors={Colors.WHITE}
            icon={undefined}
            onPress={undefined}
            textStyle={FontSize.REGULAR}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  typeContainer: {
    display: "flex",
    alignItems: "center",
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
