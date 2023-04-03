import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../screens/Home';
import Preview from '../screens/Preview';
import Search from '../screens/Search';

export default function HomeStack() {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: true,
                headerStyle:{
                    backgroundColor:'#cfd6fc'
                },
                headerTitleStyle:{
                    color:'#030c3b',
                    fontWeight:'bold',
                    alignSelf:'center'                  
                },
                headerTitle:'Utulivu Ecommerce',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen
            name="Preview"
            component={Preview}
            options={{
                headerShown: true,
                headerStyle:{
                    backgroundColor:'#cfd6fc'
                },
                headerTitleStyle:{
                    color:'#030c3b',
                    fontWeight:'bold'
                },
                headerTitle:'Preview Product',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen
            name="Search"
            component={Search}
            options={{
                headerShown: true,
                headerStyle:{
                    backgroundColor:'#cfd6fc'
                },
                headerTitleStyle:{
                    color:'#030c3b',
                    fontWeight:'bold'
                },
                headerTitle:'Search',
                headerTitleAlign:'center'
            }}
        />
    </Stack.Navigator>
  )
}
