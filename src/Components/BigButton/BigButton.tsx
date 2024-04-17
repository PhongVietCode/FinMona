import { GestureResponderEvent, Pressable, PressableProps, Text } from "react-native";
import { styles } from "./BigButton.style";
import { ReactNode } from "react";
import { Colors } from "@/Theme/Variables";
import { gStyles } from "@/Theme";
export interface BigButtonProps{
    text: string,
    backgroundColor: Colors,
    textColors: Colors,
    icon: ReactNode,
    onPress: any,
}
export const BigButton = (props: BigButtonProps) =>{
    return (
        <Pressable style={[styles.button, {backgroundColor: props.backgroundColor}]} onPress={props.onPress}>
            <Text style={[styles.text, {color: props.textColors}, gStyles.title1]}>{props.text}</Text>
        </Pressable>
    )
}