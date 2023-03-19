import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [email,setEmail] = useState(null);
    
    const login = (res) =>{
        setEmail(res);
        AsyncStorage.setItem('email', res);
    }

    const logout = () =>{
        setEmail(null);
        AsyncStorage.removeItem('email')
    }

    const isLoggedIn = async () =>{
        try {
            let email = await AsyncStorage.getItem('email');

            if(email){
                setEmail(email);
            }
        }
        catch (e){
            console.log('Logged In error')
        }
    }

    useEffect(()=>{
        isLoggedIn();
    },[])
    return (
        <AuthContext.Provider value={{login, logout, email}}>
            { children }
        </AuthContext.Provider>
    )
}