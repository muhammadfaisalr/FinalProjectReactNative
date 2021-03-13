import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';
import HomeScreen from '../view/HomeScreen';
import SelectCourierScreen from '../view/SelectCourierScreen';
import TrackingScreen from '../view/TrackingScreen';
import AboutScreen from '../view/AboutScreen';
import HistoryScreen from '../view/HistoryScreen';

const Stack = createStackNavigator();

export default function index() {
    return (
       <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen" >
          <Stack.Screen name='SelectCourier' component={SelectCourierScreen} options={{ headerShown: false}} />
          <Stack.Screen name='HomeScreen' component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name='AboutScreen' component={AboutScreen} options={{ headerShown: false}} />
          <Stack.Screen name='TrackingScreen' component={TrackingScreen} options={{ headerShown: false }} />
          <Stack.Screen name='HistoryScreen' component={HistoryScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    )
}