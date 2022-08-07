import React from "react";
import { View } from "react-native";
import { LogOutIcon, PlusIcon } from "../icons_svgs/icons";
import { MainColor } from "../styles/collors";
import { StyleBottomMenu } from "../styles/components/bottom-menu";
import { ButtonCalendario } from "./calendario";

interface IBottomMenu {

    onLogout: () => void;
    onAddEvent: () => void;
}

export function BottomMenu (props: IBottomMenu) {

    return(
        <View style={StyleBottomMenu.container}>
            
            <ButtonCalendario onClick={props.onAddEvent}>
                <PlusIcon color={MainColor}></PlusIcon>
            </ButtonCalendario>

            <ButtonCalendario onClick={props.onLogout}>
                <LogOutIcon color={MainColor}></LogOutIcon>
            </ButtonCalendario>
        </View>
    )
}