import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home';

export default function HomeStack() {
    const Stack = createNativeStackNavigator();
  return (
        <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen 
                    name="Home"
                    component={Home}
                  
                />
        </Stack.Navigator>
  )
}
