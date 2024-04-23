import { RootStackParamList } from "@/Navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import ArrowLeft from "../../../assets/icons/arrow-left.svg";
import { Colors } from "@/Theme/Variables";
import { Header } from "@/Components/Header/Header";
import { gStyles } from "@/Theme";
import { useState } from "react";
import { FlatList, ScrollView } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { InputItem } from "@/Components/Input/InputItem";
export const AddTransaction = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const types = ["Income", "Expense"];
  const [transType, setTransType] = useState(types[0]);
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
          <InputItem />
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
});
