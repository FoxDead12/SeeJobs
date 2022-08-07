import { StyleSheet } from "react-native";
import { MainColor, SecondColor } from "../collors";

export const StyleMainButton = StyleSheet.create({
    
    background: {
        backgroundColor: MainColor,
        width: '100%',
        padding: 10,
        borderRadius: 5,
        elevation: 20,
        shadowColor: MainColor
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
    
})