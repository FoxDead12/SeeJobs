import { StyleSheet } from "react-native";
import { MainColor, SecondColor } from "../collors";

export const StyleCalendario = StyleSheet.create({
    
    calendarioContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        position: 'relative',
    }
    
})

export const StyleDaysWeek = StyleSheet.create({
    
    daysContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: MainColor,
        
    },
    dayContainer: {
        flex: 1,
        padding: 4,
        height: 50,
        alignItems: 'center',
        justifyContent:'center',

    },
    dayText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        color: SecondColor
    }
    
})

export const StyleMonthDays = StyleSheet.create({
    
    dayContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: MainColor,
        
    },
    dayText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: SecondColor
    }
    
})

export const StyleMonthAndYearText = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop: 10
    },
    monthText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: MainColor,
        textAlign: 'center'
    },
    yearText: {
        fontSize: 16,
        fontWeight: 'normal',
        color: "#888",
        textAlign: 'center'
    }
    
})

export const StyleShowEventsBox = StyleSheet.create({
    
    backgroundBar: {

        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        zIndex: 10

    },
    container: {

        width: '100%',
        height: 300,
        backgroundColor: SecondColor,
        borderWidth: 1,
        borderColor: MainColor,
        padding: 10,
        borderRadius: 10
        
    },
    titulo: {
        fontSize: 21,
        color: "black",
        textAlign: "center"
    },
    eventContainer: {
        marginVertical: 10,
        
    },
    text: {
        color: "black",
        fontSize: 16
    }
    
})