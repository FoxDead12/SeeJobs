import React from "react";
import { View, Text } from "react-native";
import { StylePopupMessage } from "../styles/components/popupMessage";
import { MainButton } from "./buttons/buttons";

interface IPopupMessage {

    isError: boolean;
    message: string;
    onCloseBox: () => void;
}


export function PopupMessage (props: IPopupMessage) {

    return(
        <View style={StylePopupMessage.background}>
            <View style={StylePopupMessage.container}>

                <Text style={StylePopupMessage.title}>Message</Text>

                <Text style={StylePopupMessage.message} >{props.message}</Text>

                <View style={{width: '100%' , marginTop: 25}}>
                    <MainButton  text="OK" onClick={props.onCloseBox} />
                </View>

            </View>
        </View>
    )
}

