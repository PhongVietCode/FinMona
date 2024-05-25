import { gStyles } from "@/Theme";
import { Colors, FontSize } from "@/Theme/Variables";
import { ScrollView } from "native-base";
import { ReactNode, useRef, useState } from "react";
import { Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import { TransacItem } from "../TransacItem/TransacItem";
import CirclePlus from "../../../assets/icons/circle-plus.svg";
import { BigButton } from "../BigButton/BigButton";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import AddIcon from "../../../assets/icons/circle-plus.svg";
import { RootScreens } from "@/Screens";
import { Tag } from "@/Services";
export interface BottomSheetProps {
  show: any;
  setShow: any;
  list?: Tag[];
  label: string;
  onPress: (item: Tag) => void;
}
export const BottomSheetItemList = (props: BottomSheetProps) => {
  const [choosenItem, setChoosenItem] = useState<Tag>();
  return (
    <BottomSheet visible={props.show} onBackdropPress={props.setShow}>
      <View
        style={{
          flex: 0.5,
          backgroundColor: Colors.BACKGROUND,
          borderRadius: 20,
          padding: 16,
          alignItems: "center",
          gap: 10,
        }}
      >
        <View
          style={{
            width: "20%",
            height: 5,
            backgroundColor: Colors.TEXT_LIGHT,
            borderRadius: 50,
          }}
        />
        <View style={{ width: "100%", gap: 14, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={[gStyles.title2, { fontSize: 24 }]}>
              {props.label}
            </Text>
          </View>
          <ScrollView
            style={{ height: 400 }}
            contentContainerStyle={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              gap: 8,
              justifyContent: "space-around",
            }}
          >
            {props.list?.map((item: Tag, index) => (
              <TransacItem
                onPress={() => setChoosenItem(item)}
                isChoosen={choosenItem == item}
                // icon={item.icon}
                label={item.title}
                key={index}
              />
            ))}
          </ScrollView>
        </View>
        <BigButton
          text={"Done"}
          backgroundColor={Colors.PRIMARY}
          textColors={Colors.WHITE}
          icon={undefined}
          onPress={() => {
            props.onPress(choosenItem!);
            props.setShow();
          }}
          textStyle={FontSize.REGULAR}
        ></BigButton>
      </View>
    </BottomSheet>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.BACKGROUND,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
