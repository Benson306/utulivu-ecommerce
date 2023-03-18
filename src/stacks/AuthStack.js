import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from '../screens/Login';
import Register from '../screens/Register';

export default function AuthStack() {
    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Register'>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown:false
                }}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{
                    headerShown:true
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}
