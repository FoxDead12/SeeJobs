import React, { useEffect, useState } from "react";
import { View, Text, TextInput, ViewStyle } from "react-native";
import { MainButton } from "../components/buttons/buttons";
import { StyleLoginPage } from "../styles/pages/login";
import { LoginService } from "../services/Api";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ILoginPage {

    onChangScreen: (screen: number) => void;
}

export function LoginPage (props: ILoginPage) {
    
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>(); 
    
    const [erro, setErro] = useState<string>();

    
    async function OnClickLogin() {

        const response = await LoginService({email, password, keepSession: true});
        
        if(response.error) {

            setErro(response.error);
        }
        else if(response.token) {

            await AsyncStorage.setItem("token", response.token);    
            props.onChangScreen(1) //Definir Qual Ecra Vai       
        }
    }

    return(
        <View style={StyleLoginPage.background as ViewStyle} >

            <Text style={StyleLoginPage.title}>SEEJOBS</Text>

            <Text style={StyleLoginPage.error}>{erro}</Text>
            
            <TextInput
            style={StyleLoginPage.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Your Email"
            keyboardType="default"
            placeholderTextColor={"black"}
            />

            <TextInput
            style={StyleLoginPage.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Your Password"
            secureTextEntry={true}
            placeholderTextColor={"black"}
            
            />
    
            <View style={{width: '90%', marginTop: 50}}>
                <MainButton text="Entrar" onClick={OnClickLogin} />
            </View>

        </View>
    )    
}