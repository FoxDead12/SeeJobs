import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { BottomMenu } from "../components/bottom-menu";
import { Calendario } from "../components/calendario";
import { DeleteEvent, GetAllEvents, IEvent } from "../services/Api";
import { StyleHomePage } from "../styles/pages/home";

interface IHome {

    onChangScreen: (screen: number) => void;

}

export function Home(props: IHome) {

    const [isFecthing, setIsFecthing] = useState<boolean>(true)
    const [events, setEvents] = useState<IEvent[]>();
    
    useEffect(() => {

        GetEvents()
    }, [])

    async function GetEvents() {
        const token = await AsyncStorage.getItem("token");
        const result = await GetAllEvents({token});

        if(result.error) {

            await AsyncStorage.removeItem("token");
            props.onChangScreen(0);
        }
        else {

            setEvents(result.events);
            setIsFecthing(false);
        }
    }

    async function onLogOut() {

        await AsyncStorage.removeItem("token");
        props.onChangScreen(0);
    }

    function onAddEvent() {
        props.onChangScreen(2);
    }

    async function onDeleteEvent(event: IEvent): Promise<boolean> {

        //Remover na aplicação 
        //Remover na base de dados
        const token = await AsyncStorage.getItem("token");
        const result = await DeleteEvent({titulo: event.titulo, token});

        if(result == true) {
            
            await setEvents(events.filter(item => item.titulo !== event.titulo))
            return true;
        }
        else {
            return false;
        }
        
    }

    if(isFecthing == true) {

        return <></>
    }
    else {
        return(
            <View style={StyleHomePage.background}>
                {/* <WelcomeUser userName="David Xavier"></WelcomeUser> */}
                <Calendario deleteEvent={onDeleteEvent} eventos={events}></Calendario>
                
                <BottomMenu onLogout={onLogOut} onAddEvent={onAddEvent} ></BottomMenu>               
            </View>
        )
    }
}

