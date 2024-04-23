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
        gap: 24
    },
    header:{
        width: '100%',
        paddingVertical: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})