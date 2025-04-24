import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { RootParamList } from '../types';
import { authScreen } from '../screens';



const Stack = createNativeStackNavigator<RootParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="GoogleMapPlaceSearch" component={authScreen.GoogleMapPlaceSearch} />
        <Stack.Screen name="HistoryScreen" component={authScreen.HistoryScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
