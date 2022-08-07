import React from "react";
import { View, Image, Text } from "react-native";
import { StyleWelcomeUser } from "../styles/components/welcomeUser";

interface IWelcomeUser {

    userName: string;
}

export function WelcomeUser(props: IWelcomeUser) {

    return(
        <View style={StyleWelcomeUser.container}>

            <View style={StyleWelcomeUser.imageContainer}>
                <Image
                    style={StyleWelcomeUser.image}
                    source={require("../images/user_image.png")}
                />
            </View>

            <Text style={StyleWelcomeUser.text}>Welcome, {props.userName}</Text>

        </View>
    )
}