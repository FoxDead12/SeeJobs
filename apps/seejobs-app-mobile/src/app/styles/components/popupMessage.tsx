import { StyleSheet } from "react-native";
import { MainColor, SecondColor } from "../collors";

export const StylePopupMessage = StyleSheet.create({
    
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {

        width: "90%",
        backgroundColor: SecondColor,
        borderWidth: 1,
        borderColor: MainColor,
        padding: 10,
        borderRadius: 10,
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center'
    },
    title: {
        fontSize: 21,
        color: MainColor,
        marginBottom: 10,
        
    },
    message: {

        color: "black",
        fontSize: 16
    }
    
})