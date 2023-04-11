import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';

export default function Profile({ navigation }) {

  const { logout } = useContext(AuthContext);
  return (
    <View style={{flex: 1}}>
      <View style={{flex:1}}>
        <TouchableOpacity onPress={()=> navigation.navigate("ProfileEdit")} style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
      </View>
        
      <TouchableOpacity style={styles.signOut} onPress={()=>{logout()}}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: 'orange',
    width: 200,
    alignSelf:'center',
    marginTop: 20,
    borderRadius:25
  },
  buttonText:{
    alignSelf:'center',
    padding: 15,
    color:'white',
    fontSize:16
  },
  signOut:{
    alignSelf: 'center',
    padding:18,
    backgroundColor: '#030c3b',
    width:'100%',
    alignItems:'center'
  },
  signOutText:{
    color:'white',
    fontSize: 16
  }
})
