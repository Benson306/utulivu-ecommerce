import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import EditProfile from '../screens/Profile';
import Profile from '../screens/EditProfile';

export default function ProfileStack() {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName='ProfileHome'>
        <Stack.Screen
            name="ProfileHome"
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
                headerTitle:'Profile',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen
            name="ProfileEdit"
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
                headerTitle:'Edit Profile',
                headerTitleAlign:'center'
            }}
        />
    </Stack.Navigator>
  )
}
