import { StyleSheet, Text, TextInput, View } from "react-native"
import { Input } from '@rneui/themed';
import { Colors } from "@/Theme/Variables";
export const InputItem = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Phong</Text>
            <Input containerStyle={styles.input} style={styles.input} placeholder="..."></Input>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:'100%',
    },
    label:{

    },
    input:{
        
    }
})