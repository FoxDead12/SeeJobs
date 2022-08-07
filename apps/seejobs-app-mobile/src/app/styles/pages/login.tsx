import { StyleSheet } from "react-native";
import { MainColor, SecondColor } from "../collors";


export const StyleLoginPage = StyleSheet.create({
    background: {
        backgroundColor: SecondColor,
        minHeight: '100%',
        width: '100%',
        padding: 10,
        flex: 1,
        alignItems: 'center',
        margin: 0
        
    },
    title: {
        marginVertical: 25,
        fontSize: 50,
        color: MainColor,
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        fontSize: 16,
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 20,
        shadowColor: MainColor,
        marginTop: 25,
        color: '#000',
        
    },
    error: {
        fontSize: 16,
        color: '#C1292E',
    }

});