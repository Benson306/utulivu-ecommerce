import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function AppNav() {
    const { email } = useContext(AuthContext);
  return (
   <NavigationContainer>
    {
        email !== null ? <AppStack /> : <AuthStack />
    }
   </NavigationContainer>
  )
}
