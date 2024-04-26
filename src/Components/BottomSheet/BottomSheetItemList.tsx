import { gStyles } from "@/Theme";
import { Colors, FontSize } from "@/Theme/Variables";
import { ScrollView } from "native-base";
import { ReactNode, useRef, useState } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { BottomSheet } from "react-native-btr";
import { TransacItem } from "../TransacItem/TransacItem";
import CirclePlus from "../../../assets/icons/circle-plus.svg";
import { BigButton } from "../BigButton/BigButton";
export interface BottomSheetProps {
  show: any;
  setShow: () => void;
  list: { icon: ReactNode[]; lable: string }[];
  label: string;
}
export const BottomSheetItemList = (props: BottomSheetProps) => {
  const [choosenItem, setChoosenItem] = useState();
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
          <Text style={[gStyles.title2, { fontSize: 24 }]}>{props.label}</Text>
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
            key={(item: any) => item.icon}
          >
            {props.list.map((item: any) => (
              <TransacItem
                onPress={() => setChoosenItem(item)}
                isChoosen={choosenItem == item}
                icon={item.icon}
                label={item.lable}
              />
            ))}
          </ScrollView>
          <View style={{ alignSelf: "flex-start" }}>
            <TransacItem
              onPress={() => {}}
              isChoosen={false}
              icon={[<CirclePlus fill={Colors.PRIMARY} />]}
              label={"Add"}
            />
          </View>
        </View>
        <BigButton
          text={"Done"}
          backgroundColor={Colors.PRIMARY}
          textColors={Colors.WHITE}
          icon={undefined}
          onPress={props.setShow}
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
