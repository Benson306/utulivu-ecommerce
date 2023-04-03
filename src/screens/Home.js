import { Feather } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import TopProducts from './TopProducts';

export default function Home({ navigation }) {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }
    const handleChange = (text) =>{
      navigation.navigate('Search');
    }
  return (
    <View>
        <View style={styles.upperSection}>
            <View style={styles.search}>
              <Feather name="search" size={24} color="black" />
              <TextInput onChangeText={handleChange} style={{backgroundColor:'white', padding: 10, width:300}} placeholder='Search...'/>
            </View>
        </View>
        <View>
         <Text style={{color:'#030c3b', fontWeight:'bold', fontSize:20, margin:10 }}>Top Products</Text>
         </View>
        <TopProducts navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  upperSection:{
    backgroundColor:'#cfd6fc',
    height: 150
  },
  search:{
    marginTop:40,
    flexDirection:'row' , 
    alignSelf:'center',
    alignItems:'center',
    backgroundColor:'white',
    padding:5,
    borderRadius:5
  }
})
