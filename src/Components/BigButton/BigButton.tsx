import { GestureResponderEvent, Pressable, PressableProps, Text } from "react-native";
import { styles } from "./BigButton.style";
import { ReactNode } from "react";
import { Colors, FontSize } from "@/Theme/Variables";
import { gStyles } from "@/Theme";
export interface BigButtonProps{
    text: string,
    backgroundColor: Colors,
    textColors: Colors,
    icon: ReactNode,
    onPress: any,
    textStyle : FontSize,
}
export const BigButton = (props: BigButtonProps) =>{
    return (
        <Pressable style={[styles.button, {backgroundColor: props.backgroundColor, elevation: 3}]} onPress={props.onPress}>
            <Text style={[styles.text, gStyles.title1, {color: props.textColors, fontSize: props.textStyle}]}>{props.text}</Text>
        </Pressable>
    )
}