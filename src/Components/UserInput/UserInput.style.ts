import {Colors, FontSize} from '@/Theme/Variables';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        width: '100%',
        display:'flex',
        flexDirection:'column',
        gap: 5,
    },
    label:{
        width: '100%',        
    },
    inputField:{
        width: '100%',
        borderWidth: 0.5,
        padding: 14,
        backgroundColor: Colors.WHITE,
        borderRadius: 5
    }
})