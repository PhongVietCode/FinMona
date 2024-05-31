import { KeyboardTypeOptions, StyleSheet, Text, View } from "react-native";
import { Colors, FontSize } from "@/Theme/Variables";
import { TextInput } from "react-native-paper";
import { ReactNode } from "react";
import { gStyles } from "@/Theme";
export interface InputItemProps {
  onChangeText: (e:any) => void;
  label: string;
  placeholder: string;
  right: ReactNode;
  value: string;
  showKeyboard: boolean,
  keyboardType?: KeyboardTypeOptions
}
export const InputItem = (props: InputItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, gStyles.title3, {fontSize: 16}]}>{props.label}</Text>
      <TextInput
      showSoftInputOnFocus={props.showKeyboard}
        placeholderTextColor={Colors.LIGHT_GRAY}
        mode="outlined"
        style={styles.input}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        right={props.right}
        value={props.value}
        keyboardType={props.keyboardType || 'default'}
      ></TextInput>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
   flex: 1,
   marginVertical: 10,
  },
  label: {
    marginBottom: 6
  },
  input: {
    backgroundColor: Colors.BACKGROUND,
  },
});
