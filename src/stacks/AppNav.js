import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function AppNav() {
    const { email } = useContext(AuthContext);
  return (
   <NavigationContainer>
    {
        email !== null ? <HomeStack /> : <AuthStack />
    }
   </NavigationContainer>
  )
}
