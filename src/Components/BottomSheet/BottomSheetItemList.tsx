import { gStyles } from "@/Theme";
import { Colors, FontSize } from "@/Theme/Variables";
import { ScrollView } from "native-base";
import { ReactNode, useEffect, useRef, useState } from "react";
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
import EmptyIcon from "../../../assets/icons/empty.svg";

export interface BottomSheetProps {
  show: any;
  setShow: any;
  list?: Tag[];
  label: string;
  onPress: (item: Tag) => void;
  editItemChoosen?: string;
}
export const BottomSheetItemList = (props: BottomSheetProps) => {
  let tagChoosen: Tag = {
    id: "",
    icon: "",
    title: "",
    type: "",
  };
  const [choosenItem, setChoosenItem] = useState<Tag>(tagChoosen);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    if (props.editItemChoosen) {
      tagChoosen =
        props.list?.filter((item) => item.title == props.editItemChoosen)[0] ||
        tagChoosen;
      console.log(tagChoosen);
    }
    setChoosenItem(tagChoosen);
  }, [props.list]);
  return (
    <BottomSheet
      visible={props.show}
      onBackdropPress={() => {
        props.setShow();
        props.onPress(choosenItem!);
      }}
    >
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
            <Pressable
              onPress={() => {
                props.setShow();
                props.onPress(choosenItem!);
                navigation.navigate(RootScreens.TAG);
              }}
            >
              <Text style={{fontSize: 16, backgroundColor: Colors.STROKE, padding: 8}}>Create New</Text>
            </Pressable>
          </View>
          {props.list?.length == 0 ? (
            <View style={{ alignItems: "center" }}>
              <EmptyIcon stroke={Colors.LIGHT_GRAY} width={100} height={100} />
              <Text
                style={{
                  color: Colors.LIGHT_GRAY,
                  fontWeight: "500",
                  fontSize: 17,
                }}
              >
                You don't have any item
              </Text>
            </View>
          ) : (
            <ScrollView
              style={{ height: 400 }}
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                gap: 8,
                justifyContent: "flex-start",
              }}
            >
              {props.list?.map((item: Tag, index) => (
                <TransacItem
                  onPress={() => setChoosenItem(item)}
                  isChoosen={choosenItem.id == item.id}
                  // icon={item.icon}
                  label={item.title}
                  key={index}
                />
              ))}
            </ScrollView>
          )}
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
