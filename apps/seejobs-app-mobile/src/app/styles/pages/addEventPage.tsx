import { StyleSheet } from "react-native";
import { MainColor, SecondColor } from "../collors";


export const StyleAddEventPage = StyleSheet.create({
    background: {
        backgroundColor: SecondColor,
        minHeight: '100%',
        width: '100%',
        padding: 0,
        flex: 1,
        alignItems: 'center',
        margin: 0
        
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
    title: {
        
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
        color: MainColor,
        textAlign: 'center'

    },
    error: {
        fontSize: 16,
        color: '#C1292E',
    }

});