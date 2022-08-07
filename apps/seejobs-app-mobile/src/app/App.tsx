/* eslint-disable jsx-a11y/accessible-emoji */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { AddEventPage } from './pages/AddEventPage';
import { Home } from './pages/Home';
import { LoginPage } from './pages/LoginPage';
import { SecondColor } from './styles/collors';


enum Screen {

  Login = 0,
  Home = 1,
  AddEvent = 2
}


export const App = () => {

  const [screen, setScreen] = useState<string>()

  useEffect(() => {

    fetchData()
    async function fetchData() {
        const token = await AsyncStorage.getItem("token");

        if(token) {

          ChangeScreenApp(1) //Definir Qual Ecra Vai
        }
        else {

          ChangeScreenApp(0)
        }
    }
  }, [])

  function ChangeScreenApp(screen: number) {

    setScreen(Screen[screen]);
  }

  return (
    <>
      <StatusBar backgroundColor={SecondColor} barStyle="dark-content" />
      <SafeAreaView style={{backgroundColor: SecondColor}}>
        
        <NavigationSystem screen={screen} onChangeScreen={ChangeScreenApp} />
        
      </SafeAreaView>
    </>
  );
};


export default App;

interface INavigationSystem {

  screen: string;
  onChangeScreen: (screen: number) => void;
}

function NavigationSystem(props: INavigationSystem) {

  const [screen, setScreen] = useState<string>()

  useEffect(() => {

    changeScreen()
    async function changeScreen() {
      await setScreen(props.screen);
    }
  }, )




  if(screen == Screen[0]) {

    return <LoginPage onChangScreen={props.onChangeScreen} />;
  }

  if(screen == Screen[1]) {

    return <Home onChangScreen={props.onChangeScreen}/>;
  }

  if(screen == Screen[2]) {

    return <AddEventPage onChangScreen={props.onChangeScreen}></AddEventPage>
  }

  return <></>
}