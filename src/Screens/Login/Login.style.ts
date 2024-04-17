import { StyleSheet } from "react-native";

import { Colors, MetricsSizes } from "@/Theme/Variables";

export const styles = StyleSheet.create({
    container:{
        display: 'flex',
        paddingHorizontal: 10,
        paddingVertical: 16,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'column',
        gap: 16,
        overflow:'scroll'
    },
    inputContainer:{
        width: '100%',
        gap: 16
    },
    header:{
        width: '100%',
        paddingVertical: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})