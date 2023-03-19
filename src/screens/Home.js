import React, { useContext } from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export default function Home() {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }
  return (
    <View>
        <Text>Home</Text>
        <TouchableOpacity style={{width:200, backgroundColor:'maroon', padding: 10, alignSelf:'center'}} onPress={()=>handleLogout()}>
            <Text style={{color:'white', alignSelf:'center' }}>Log Out</Text>
        </TouchableOpacity>
    </View>
  )
}
