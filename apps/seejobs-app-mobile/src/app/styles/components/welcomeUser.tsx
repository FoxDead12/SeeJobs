import { StyleSheet } from "react-native";
import { MainColor, SecondColor } from "../collors";

export const StyleWelcomeUser = StyleSheet.create({
    
    container: {
        padding: 10,
        marginTop: 25,
        paddingBottom: 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: MainColor,
        borderBottomWidth: 1,
    },
    imageContainer: {

        width: 70,
        height: 70,
        elevation: 5,
        shadowColor: MainColor,
        shadowRadius: 70,
        borderRadius: 30
        
    },
    image: {
        width: 70,
        height: 70,
        
    },
    text: {

        fontSize: 24,
        fontWeight: "normal",
        color: 'black',
        
    }
    
})