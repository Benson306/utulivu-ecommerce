import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import EditProfile from '../screens/EditProfile';
import Profile from '../screens/Profile';

export default function ProfileStack() {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="ProfileHome">
        <Stack.Screen
            name="ProfileHome"
            component={Profile}
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
                headerTitle:'Profile',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen
            name="ProfileEdit"
            component={EditProfile}
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
                headerTitle:'Edit Profile',
                headerTitleAlign:'center'
            }}
        />
    </Stack.Navigator>
  )
}
