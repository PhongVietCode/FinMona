import { gStyles } from "@/Theme";
import { Colors } from "@/Theme/Variables";
import { ReactNode } from "react";
import { Text, View } from "react-native";
interface NotificationProps {
  icon: ReactNode;
  label: string;
  detail: string;
  time: string;
}
export const NotificationItem = (props: NotificationProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: Colors.STROKE,
        padding: 5,
        borderRadius: 10,
        alignItems: "center",
      }}
    >
      <View style={{ padding: 15 }}>{props.icon}</View>
      <View style={{ flex: 1, gap: 8 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={gStyles.title3}>{props.label}</Text>
          <Text style={[gStyles.regular2, {color:Colors.LIGHT_GRAY}]}>{props.time}</Text>
        </View>
        <View>
          <Text style={{fontWeight: '400', color:Colors.LIGHT_GRAY}}>{props.detail}</Text>
        </View>
      </View>
    </View>
  );
};
