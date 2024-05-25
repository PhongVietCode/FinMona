import { StyleSheet } from "react-native";
import { Colors, FontSize, MetricsSizes } from "./Variables";


export const gStyles = StyleSheet.create({
    title1: {
        fontSize: FontSize.LARGE + 1,
        fontWeight: '500'
    },
    title2:{
        fontSize: FontSize.REGULAR,
        fontWeight: '500'
    },
    title3:{
        fontSize: FontSize.SMALL,
        fontWeight: '500'
    },
    regular1: {
        fontSize: FontSize.REGULAR,
        fontWeight: '400'
    },
    regular2:{
        fontSize: FontSize.SMALL,
        fontWeight: '400'
    },
    regular3:{
        fontSize: FontSize.TINY,
        fontWeight: '400'
    }
})