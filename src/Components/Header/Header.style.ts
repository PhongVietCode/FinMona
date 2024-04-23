import { Colors } from "@/Theme/Variables";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container:{
        backgroundColor: Colors.BACKGROUND,
        display:'flex',
        flexDirection: "row",
        paddingHorizontal: 16,
        paddingVertical: 22,
        alignItems: 'center',
        width: '100%',
        justifyContent:'space-between'
    }
})