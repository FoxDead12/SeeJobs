/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { View, Text, TouchableNativeFeedback, FlatList, TouchableNativeFeedbackBase, StyleProp, ViewStyle, ScrollView } from "react-native";
import { MainColor, SecondColor } from "../styles/collors";
import { StyleCalendario, StyleDaysWeek, StyleMonthAndYearText, StyleMonthDays, StyleShowEventsBox } from "../styles/components/calendario";
import { LeftArrow, RightArrow } from "../icons_svgs/arrows";
import { IEvent } from "../services/Api";
import { CloseIcon, TrashIcon } from "../icons_svgs/icons";

// Vamos Criar o calendario
//Estrutura do calendario
//INDICAR DIAS DA SEMANA
interface ICalendario {

    eventos: IEvent[];
    deleteEvent: (event: IEvent) => Promise<boolean>;

}


export function Calendario(props: ICalendario) {

    const [currentMounth, setcurrentMounth] = useState<number>(() => {
        const newDate = new Date()
        const month = newDate.getMonth() + 1;
        return month;
    });

    const [currentYear, setcurrentYear] = useState<number>(() => {
        const newDate = new Date()
        const year = newDate.getFullYear();
        return year;
    });

    const [events, setEvents] = useState<IEvent[]>();
    const [showEvents, setShowEvents] = useState<boolean>(false);

    function onClickFront () {

        const month = currentMounth;
        if(month >= 12) {

            setcurrentMounth((oldMount: number) => {return 1});
            setcurrentYear((oldYear: number) => {return oldYear + 1});
        }
        else{
            setcurrentMounth((oldMount: number) => {return oldMount + 1});

        }

    }

    function onClickBack () {
        const month = currentMounth;
        if(month <= 1) {

            setcurrentMounth((oldMount: number) => {return 12});
            setcurrentYear((oldYear: number) => {return oldYear - 1});
        }
        else{
            setcurrentMounth((oldMount: number) => {return oldMount - 1});

        }

    }

    function onShowEvent(events: IEvent[]) {

        setEvents(events);
        setShowEvents(true)
    }

    function onCloseEvent() {

        setShowEvents(false)
    }

    async function onDeleteEvent(event: IEvent) {

        const result = await props.deleteEvent(event);
        if(result == true) {

            setEvents(events.filter(item => item.titulo != event.titulo));
        }

    }

    return(
        <View>
            <View style={StyleCalendario.calendarioContainer}>
                <View style={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <ButtonCalendario onClick={onClickBack}><LeftArrow/></ButtonCalendario>
                    <MonthAndYearText numbMonth={currentMounth} numbYear={currentYear}/>
                    <ButtonCalendario onClick={onClickFront}><RightArrow/></ButtonCalendario>
                </View>

                <View style={{borderRadius: 10, width: '100%', overflow: 'hidden', elevation: 10, shadowColor: MainColor, shadowOpacity: 1}}>
                    <DaysWeek/>
                    <MonthDays numbOfMonth={currentMounth} numbOfYear={currentYear} events={props.eventos} onShowEvent={onShowEvent}/>
                </View>


                
            </View>
            
            {showEvents ? <ShowEventsBox deleteEvent={onDeleteEvent} events={events} closeWindow={onCloseEvent}></ShowEventsBox> : <></>}
           

        </View>
    )
}

function DaysWeek(){

    return(
        <View style={StyleDaysWeek.daysContainer}>
            <View style={StyleDaysWeek.dayContainer}>
                <Text style={StyleDaysWeek.dayText}>D</Text>
            </View>

            <View style={StyleDaysWeek.dayContainer}>
                <Text style={StyleDaysWeek.dayText}>S</Text>
            </View>

            <View style={StyleDaysWeek.dayContainer}>
                <Text style={StyleDaysWeek.dayText}>T</Text>
            </View>

            <View style={StyleDaysWeek.dayContainer}>
                <Text style={StyleDaysWeek.dayText}>Q</Text>
            </View>

            <View style={StyleDaysWeek.dayContainer}>
                <Text style={StyleDaysWeek.dayText}>Q</Text>
            </View>

            <View style={StyleDaysWeek.dayContainer}>
                <Text style={StyleDaysWeek.dayText}>S</Text>
            </View>

            <View style={StyleDaysWeek.dayContainer}>
                <Text style={StyleDaysWeek.dayText}>S</Text>
            </View>
        </View>
    )
}

interface IRowDays {
    daysNumber: IRowInput[];
}

interface IRowInput {
    dayNumber: string,
    events: IEvent[], //Vai Receber o Proprio Evento, VAI SER DEFENIDO MAIS TARDE
    currentDay: boolean;

}

interface IDataType {
    day: number;
    month: number;
    year: number;
}

enum DaysOfWekk {

    Domingo = 0,
    Segunda = 1,
    Terca = 2,
    Quarta = 3,
    Quinta = 4,
    Sexta = 5,
    Sabado = 6
}

interface IMonthDays {

    numbOfMonth: number;
    numbOfYear: number;
    events: IEvent[];
    onShowEvent: (events: IEvent[]) => void;
}

function MonthDays(props: IMonthDays) {
    
    function getCurrentDate(): IDataType{
        const newDate = new Date()
        const day = newDate.getDate();
        const month = newDate.getMonth() + 1;
        const year = newDate.getFullYear();
        return {day, month, year};
    }

    function getDateToShow(): IDataType {
        const day = 1;
        const month = props.numbOfMonth;
        const year = props.numbOfYear;
        return {day, month, year};
    }

    function getFirstDayOfWeek(data: IDataType): number {

        const d = new Date(data.year + "/" + data.month + "/" + 1);
        const dayWeek = d.getDay();
        return dayWeek;
    }

    function getLastDayOfMonth(month: number, year: number): number {

        const d = new Date(year, month , 0);
        return d.getDate();
    }

    function GenerateCalender() {

        const currentDataType = getCurrentDate();
        const dateToShowType = getDateToShow();
        const firstDayWeek = getFirstDayOfWeek(dateToShowType);
        const lasDay = getLastDayOfMonth(dateToShowType.month, dateToShowType.year);

        //Aqui apenas vou definir os inputs dos dados
        const elementsToAdd: ReactElement[] = []; 
        const tempSaveDays: string[] = [];
        let currentDay: number = 1;
        for(let i = 1; i <= lasDay + firstDayWeek; i++) {

            //Verificar Primeira Semana
            if(i <= firstDayWeek) {

                tempSaveDays.push("");
            }
            else{

                tempSaveDays.push(currentDay.toString());
                currentDay++;
            }
        }

        //Aqui vou separar as linhas geralas e adicionar
        for(let i = 0; i <= lasDay + firstDayWeek; i+=7) {

            let daysNumber: IRowInput[] = []
            for(let c = i; c < i + 7; c++){
                if(tempSaveDays[c]){
                    daysNumber.push({dayNumber: tempSaveDays[c], 
                    events:  DayHaveEvent(Number(tempSaveDays[c]), dateToShowType.month, dateToShowType.year), 
                    currentDay: currentDataType.day.toString() == tempSaveDays[c] && currentDataType.month == dateToShowType.month && currentDataType.year == dateToShowType.year ? true : false                })
                }
                else {
                    daysNumber.push({dayNumber: "", events: null, currentDay: false})
                }
            }

            elementsToAdd.push(<RowDays daysNumber={daysNumber} key={i} />)
        }

        return elementsToAdd.map(row => {

            return row;
        })
    }

    function RowDays(rowDaysProps: IRowDays) {
        
        return(
            <View style={{flexDirection: 'row', borderTopColor: '#fff', borderTopWidth: 1}}>
                {rowDaysProps.daysNumber.map((day: IRowInput, key: number) => {

                    return(
                        <TouchableNativeFeedback key={key} disabled={day.events != null ? false : true} onPress={() => onClickEvent(day.events)}>
                            <View style={[StyleMonthDays.dayContainer , {flex: 1, backgroundColor: day.events != null ? 'red' : MainColor}]}>
                                <Text style={[StyleMonthDays.dayText, {color: day.currentDay == true ? 'yellow' : SecondColor}]}>{day.dayNumber}</Text>
                            </View> 
                        </TouchableNativeFeedback>
                    )
                })}
            </View>
        )
    }

    function DayHaveEvent(day: number, month: number, year: number): IEvent[] {

        const dayDate = new Date(`${year}/${month}/${day}`);
        let eventsInDay: IEvent[] = [];
        props.events.map((event: IEvent) => {

            const eventDate = new Date(event.data)
            if(dayDate.toString() == eventDate.toString()) {
                eventsInDay.push(event);
            }

        })

        if(eventsInDay.length == 0) {

            return null;
        }
        
        return eventsInDay;
    }

    function onClickEvent(events: IEvent[]): void {

        props.onShowEvent(events);
     }

    return(
        <View>

            {GenerateCalender()}
            
        </View>
    )
}

interface IButtonCalendario {

    children: JSX.Element;
    style?: StyleProp<ViewStyle>;
    onClick: () => void;
}

export function ButtonCalendario(props: IButtonCalendario) {
    
    return (
        <TouchableNativeFeedback style={props.style} onPress={props.onClick}>
            <View>
                {props.children}
            </View>
        </TouchableNativeFeedback>
    )
}

interface IMonthAndYearText {

    numbMonth: number;
    numbYear: number;
}

enum EnumMonthAndYearText {
    Janeiro = 1,
    Fevereiro = 2,
    Março = 3,
    Abril = 4,
    Maio = 5,
    Junho = 6,
    Julho = 7,
    Agosto = 8,
    Setembro = 9,
    Outubro = 10,
    Novembro = 11,
    Dezembro = 12

}

function MonthAndYearText(props: IMonthAndYearText) {

    const [mounthText , setmounthText] = useState<string>();
    useEffect(() => {
        
        const mounth = EnumMonthAndYearText[props.numbMonth];
        setmounthText(mounth)
    })


    return(
        <View style={StyleMonthAndYearText.container}>
            <Text style={StyleMonthAndYearText.monthText}>{mounthText}</Text>
            <Text style={StyleMonthAndYearText.yearText}>{props.numbYear.toString()}</Text>
        </View>
    )
}

interface IShowEventsBox {

    events: IEvent[];
    closeWindow: () => void;
    deleteEvent: (event: IEvent) => void;
}

function ShowEventsBox (props: IShowEventsBox) {

    const [day, setDay] = useState<string>();
    const scrollViewRef = useRef<null | ScrollView>(null);

    useEffect(() => {

        if(props.events && props.events.length > 0) {

            const day = new Date(props.events[0].data).getDate()
            setDay(day.toString());
        }
    })

    
    if(props.events && props.events.length > 0) {

        return (
            <View style={StyleShowEventsBox.backgroundBar}>  
                <View style={StyleShowEventsBox.container}>


                    <Text style={StyleShowEventsBox.titulo} >Day {day}</Text>
                    
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', position: 'absolute', right: 10, top: 10}}>
                        <ButtonCalendario onClick={props.closeWindow}><CloseIcon/></ButtonCalendario>
                    </View>

                    <ScrollView ref={(ref) => {scrollViewRef.current = ref;}} contentInsetAdjustmentBehavior="automatic" style={{ zIndex: 4, backgroundColor: 'blue'}} scrollEnabled={true}>
                        {
                            props.events.map((item, i) => {
                                return(
                                    <View style={StyleShowEventsBox.eventContainer} key={i}>
                                
                                    <View style={{position: 'absolute', right: 2, zIndex: 1}}>
                                        <ButtonCalendario onClick={() => props.deleteEvent(item)}><TrashIcon size={30} color={"red"}/></ButtonCalendario>
                                    </View>
                                    <Text style={StyleShowEventsBox.text} >Name: {item.titulo}</Text>
                                    <Text style={StyleShowEventsBox.text}>Date: {item.data.toString()}</Text>
                                    {item.horas ? <Text style={StyleShowEventsBox.text}>Time: {item?.horas.toString()}</Text> : <></>}
                                    <Text style={StyleShowEventsBox.text}>Description:</Text>
                                    <Text style={StyleShowEventsBox.text}>{item.descricao}</Text>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>

                    {/* <FlatList
                        ref={(ref) => {
                            scrollViewRef.current = ref;
                        }}
                        
                        scrollEnabled={true}
                    
                        data={props.events}
                        renderItem={({item}) => 
                        }

                        style={{maxHeight: '100%'}}
                    /> */}
                    
                </View>
            </View>

        )
    }
    else {
        return (
           <>
           </>
        )
    }

}