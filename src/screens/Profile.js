import { Formik } from 'formik';
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthContext';
import ApiLink from '../utils/ApiLink';


export default function Profile({ navigation }) {

  const { logout } = useContext(AuthContext);

  const [ data, setData ]=useState([]);
    const [ loading, setLoading ] = useState(true);

    let star = "*";
    let stars = "";
    const [passLength, setLength] = useState(null);

    const link = ApiLink();


    useEffect(()=>{
        const abortCont = new AbortController();
        fetch(`${link}/profile`,{
            credentials: 'include', 
            proxy: true, 
            withCredentials: true,
            signal: abortCont.signal
        })
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                setLoading(false);
            }
        })
        .then((res)=>{
            setLoading(false);
            setData(res);
            setLength(res.password.length);
        })
        .catch((err)=>{
            setLoading(false);
        })


        return ()=> abortCont.abort();
    },[data])

    for(let i = 0; i<passLength; i++){
        stars+=star;
    }

  return (
    <View style={{flex: 1}}>
      <View style={{flex:1, margin: 10}}>
             
        <View style={styles.card}>
          <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>Account Details</Text>

          { loading && 
          
                <View style={{marginTop:20,justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size='large'  color="#009999"/>
                </View>
          }
        
          { !loading && 
          
                <View>
                    <Text style={styles.labels}>Full Name:</Text>

                    <Text style={styles.values}>{data.name}</Text>
      
                    <Text style={styles.labels}>Email:</Text>
      
                    <Text style={styles.values}>{data.email}</Text>
      
                    <Text style={styles.labels}>Phone Number:</Text>
      
                    <Text style={styles.values}>{data.phone}</Text>
      
                    <Text style={styles.labels}>Password:</Text>
      
                    <Text style={styles.values}>{stars}</Text>
      
                    <TouchableOpacity onPress={()=> navigation.navigate("ProfileEdit")} style={styles.button}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
      
                </View>
             
            }
          </View>
    </View>

    <TouchableOpacity style={styles.signOut} onPress={()=>{logout()}}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor:'#fff',
    shadowOffset: {width:1, height:1},
    shadowColor:'#333',
    shadowOpacity: 0.3,
    shadowRadius:2,
    marginHorizontal: 4,
    marginVertical: 15,
    padding:10,
    width:330,
    alignSelf:'center'
  },
  labels:{
   fontSize: 18,
   padding: 8,
   color:'maroon',
   fontWeight:'bold'
  },
  values:{
    fontSize: 16,
    padding: 8,
    color:'black',
    marginLeft: 15
   },
  button:{
    width: 200,
    alignSelf:'center',
    marginTop: 20,
    borderRadius:25,
    borderWidth:1,
    marginBottom:20
  },
  buttonText:{
    alignSelf:'center',
    padding: 10,
    color:'#030c3b',
    fontSize:16
  },
  signOut:{
    alignSelf: 'center',
    padding:18,
    backgroundColor: '#cfd6fc',
    width:'100%',
    alignItems:'center'
  },
  signOutText:{
    color:'#030c3b',
    fontSize: 16
  }
})
