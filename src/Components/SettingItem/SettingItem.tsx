import { Pressable, Text, View } from "react-native";
import { ReactNode } from "react";
import { Colors } from "@/Theme/Variables";
import { gStyles } from "@/Theme";

interface SettingItemProps {
  icon: ReactNode;
  label: string;
  des: string;
  rightIcon: ReactNode;
  onPress: () => void;
}
export const SettingItem = (props: SettingItemProps) => {
  return (
    <Pressable
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        flex: 1,
        gap: 10
      }}
      onPress={props.onPress}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View
          style={{
            padding: 16,
            backgroundColor: Colors.STROKE,
            borderRadius: 17,
          }}
        >
          {props.icon}
        </View>
      </View>
      <View style={{ flexDirection: "column", gap: 5, flexShrink: 1 }}>
        <Text style={[gStyles.title3, { fontSize: 16 }]}>{props.label}</Text>
        <Text
          style={[
            gStyles.title3,
            { fontWeight: "500", color: Colors.LIGHT_GRAY, flexWrap: "wrap" },
          ]}
        >
          {props.des}
        </Text>
      </View>
      <View>{props.rightIcon}</View>
    </Pressable>
  );
};
