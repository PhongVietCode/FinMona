import { Colors } from "@/Theme/Variables";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
export interface TransacItemProps {
  // icon: ReactNode[];
  label: string;
  isChoosen: boolean,
  onPress: () => void,
  key: number,
}
export const TransacItem = (props: TransacItemProps) => {
  
  return (
    <Pressable style={[styles.container, {backgroundColor: props.isChoosen ? Colors.PRIMARY :Colors.WHITE}]} onPress={props.onPress}>
      {/* {props.isChoosen ? props.icon[1] : props.icon[0]} */}
      <Text style={{fontWeight: '500', fontSize: 16, color: props.isChoosen ? Colors.WHITE:Colors.PRIMARY }}>{props.label.split("_")[0]}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    borderWidth: 2, 
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    gap:4,
    borderRadius:11,
    borderColor: Colors.PRIMARY
  },
});
