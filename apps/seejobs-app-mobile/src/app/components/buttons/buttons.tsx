import React from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";
import { StyleMainButton } from "../../styles/components/buttons";


interface IButton {
    text:string;
    onClick: () => void;
}

export function MainButton(props: IButton) {

    return(
        <TouchableNativeFeedback onPress={props.onClick}>
            <View style={StyleMainButton.background}>
                <Text style={StyleMainButton.text}>{props.text}</Text>
            </View>
        </TouchableNativeFeedback>
    )
}