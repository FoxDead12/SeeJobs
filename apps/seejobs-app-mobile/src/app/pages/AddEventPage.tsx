import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { StyleAddEventPage } from "../styles/pages/addEventPage";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { MainButton } from "../components/buttons/buttons";
import { CreateEvent } from "../services/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PopupMessage } from "../components/popupMessage";
import { ButtonCalendario } from "../components/calendario";
import { LeftArrow } from "../icons_svgs/arrows";

interface IAddEventPage {

    onChangScreen: (screen: number) => void;
}

export function AddEventPage (props: IAddEventPage){

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    //Date
    const [date, setDate] = useState<Date>(null);
    const [showDate, setShowDate] = useState<boolean>(false);

    //Time
    const [time, setTime] = useState<Date>(null);
    const [showTime, setShowTime] = useState<boolean>(false);

    //Error
    const [error, setError] = useState<string>();

    //Message Box
    const [showBox, setShowBox] = useState<boolean>(false);

    function onChangeDatePicker(event: DateTimePickerEvent) {

        const date = new Date(event.nativeEvent.timestamp);
        setShowDate(false)
        setDate(date)
    }

    function onChangeTimePicker(event: DateTimePickerEvent) {

        const date = new Date(event.nativeEvent.timestamp);
        setShowTime(false)
        setTime(date)
    }

    async function onClickCreate() {

        if(CheckInputs() == false) {
            
            setError("Field All Camps!")   
            return;
        }

        const token = await AsyncStorage.getItem("token")
        const response = await CreateEvent({titulo: title, descricao: description, data: date, hora: time, token});
        
        if(response) {
            
            setError(response.error)
            return;
        }

        setShowBox(true);
    }

    function CheckInputs(): boolean {

        let validInputs = true;

        if(title == "") {
            validInputs = false;
        }

        if(description == "") {
            validInputs = false;
        }

        if(date == null) {
            validInputs = false;
        }

        return validInputs
    }

    return(
        <View style={StyleAddEventPage.background}>

            <View style={{position: 'absolute', left: '5%', marginTop: 10}}>
                <ButtonCalendario onClick={() => {props.onChangScreen(1)}}><LeftArrow/></ButtonCalendario>
            </View>

            <Text style={StyleAddEventPage.title} >Creat Event</Text>

            <Text style={StyleAddEventPage.error}>{error}</Text>

            <TextInput
                style={[StyleAddEventPage.input]}
                value={title}
                onChangeText={(text) => setTitle(text)}
                placeholder="Title"
                keyboardType="default"
                placeholderTextColor={"black"}
            />
            
            <TextInput
                style={[StyleAddEventPage.input]}
                value={date ? date.toLocaleDateString() : ''}
                onChangeText={() => {return}}
                onTouchStart={() => setShowDate(true)}
                placeholder="Date"
                keyboardType="default"
                placeholderTextColor={"black"}
            />

            <TextInput
                style={[StyleAddEventPage.input]}
                value={time ? time.toLocaleTimeString() : ''}
                onChangeText={() => {return}}
                onTouchStart={() => setShowTime(true)}
                placeholder="Time"
                keyboardType="default"
                placeholderTextColor={"black"}
            />

            <TextInput
                style={[StyleAddEventPage.input]}
                value={description}
                onChangeText={(text) => setDescription(text)}
                placeholder="Description"
                keyboardType="default"
                placeholderTextColor={"black"}
                numberOfLines={5}
                multiline={true}
                textAlignVertical={"top"}
            />

            <View style={{width: '90%', marginTop: 50}}>
                <MainButton text="Create" onClick={onClickCreate} />
            </View>

            {showDate === true ?            
                <DateTimePicker   
                    testID="dateTimePicker"
                    value={new Date()}
                    display={'default'}
                    mode={"date"}
                    onChange={onChangeDatePicker}
                    is24Hour={true}
                />
            : <></>}

            {showTime === true ?            
                <DateTimePicker   
                    testID="dateTimePicker"
                    value={new Date()}
                    display={'default'}
                    mode={"time"}
                    onChange={onChangeTimePicker}
                    is24Hour={true}
                />
            : <></>}


            {showBox === true ?
                <PopupMessage isError={false} message={"Event created successfully!"} onCloseBox={() => {
                    setShowBox(false)
                    setDate(null)
                        setTime(null)
                    setTitle("")
                    setDescription("")
                }}></PopupMessage>
            :<></>}

        </View>
    )
}