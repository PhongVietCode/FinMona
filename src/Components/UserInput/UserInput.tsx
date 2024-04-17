import { InputModeOptions, Text, TextInput, View } from "react-native";
import { styles } from "./UserInput.style";
import { gStyles } from "@/Theme";
import { Colors } from "@/Theme/Variables";
import PasswordShow from "../../../assets/icons/eye-alt.svg"
import { useState } from "react";
export interface UserInputProps {
  lable: string;
  showIcon: boolean;
  placeholder: string;
  secureText: boolean;
  mode: InputModeOptions,
  onChange: any
}
export const UserInput = (props: UserInputProps) => {
  return (
    <View style={styles.container}>
      <Text style={[gStyles.title3, styles.label]}>{props.lable}</Text>
      <TextInput style={styles.inputField} placeholder={props.placeholder} placeholderTextColor={Colors.LIGHT_GRAY} secureTextEntry={props.secureText} inputMode={props.mode} onChangeText={props.onChange}/>
    </View>
  );
};
