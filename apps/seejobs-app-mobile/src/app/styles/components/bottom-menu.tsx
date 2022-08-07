import { StyleSheet } from "react-native";
import { MainColor, SecondColor } from "../collors";

export const StyleBottomMenu = StyleSheet.create({
    
    container: {
        backgroundColor: SecondColor,
        borderColor: MainColor,
        borderWidth: 2,
        width: '100%',
        height: 50,
        position: 'absolute',
        bottom: 10,
        borderRadius: 5,
        elevation: 20,
        shadowColor: MainColor,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
    
})