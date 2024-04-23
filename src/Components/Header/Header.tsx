import { View } from "native-base";
import { style } from "./Header.style";
import { Text } from "react-native";
import { ReactNode } from "react";
export interface HeaderProps {
  left: ReactNode;
  right: ReactNode;
  center: ReactNode;
}
export const Header = (props: HeaderProps) => {
  return <View style={style.container}>
    {props.left}
    {props.center}
    {props.right}
  </View>;
};
