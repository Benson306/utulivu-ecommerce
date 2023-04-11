import { Formik } from 'formik';
import React, {useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ApiLink from '../utils/ApiLink';
import * as yup from 'yup'

const profileSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required().min(3),
    phone: yup.number().required().min(10),
    password: yup.string().required().min(5),

})

export default function EditProfile(){

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
      <ScrollView>
      <View style={{flex:1, margin: 10}}>
             
        <View style={styles.card}>
          <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>Edit Account Details</Text>

          { loading && 
          
                <View style={{marginTop:20,justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size='large'  color="#009999"/>
                </View>
          }
        
          { !loading && 
          <Formik
            initialValues={{ name: data.name, email: data.email, phone: data.phone, password: data.password}}
            validationSchema={profileSchema}

          >
            {(props)=>(
          
          <View>
              <Text style={styles.labels}>Full Name:</Text>
              <TextInput
                style={styles.input}
                placeholder='Full Name'
                value={props.values.name}
                onChangeText={props.handleChange('name')}
                onBlur={props.handleBlur('name')}
                blurOnSubmit={true}
                autoCorrect={false}
                />
              <Text style={styles.errorText}>{props.touched.name && props.errors.name}</Text>

              <Text style={styles.labels}>Email:</Text>
              <TextInput
                style={styles.input}
                placeholder='Email'
                value={props.values.email}
                onChangeText={props.handleChange('email')}
                onBlur={props.handleBlur('email')}
                blurOnSubmit={true}
                autoCorrect={false}
                />
              <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>

              <Text style={styles.labels}>Phone Number:</Text>
              <TextInput
                style={styles.input}
                placeholder='Phone Number'
                value={props.values.phone}
                onChangeText={props.handleChange('phone')}
                onBlur={props.handleBlur('phone')}
                blurOnSubmit={true}
                autoCorrect={false}
                />
              <Text style={styles.errorText}>{props.touched.phone && props.errors.phone}</Text>

              <Text style={styles.labels}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder='Password'
                value={props.values.password}
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                blurOnSubmit={true}
                autoCorrect={false}
                secureTextEntry={true}
                />
              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

              <TouchableOpacity onPress={()=> console.log('pressed')} style={styles.button}>
                  <Text style={styles.buttonText}>Save Profile Details</Text>
              </TouchableOpacity>

          </View> 
        
        )}
            </Formik>
        }
          
        </View>
      </View>
      </ScrollView>
        
    </View>
     );
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
      marginBottom:20,
      backgroundColor:'#030c3b'
    },
    buttonText:{
      alignSelf:'center',
      padding: 10,
      color:'white',
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
    },
    input:{
      borderBottomWidth:1,
      padding:5,
      marginLeft:10
    },
    errorText:{
      color:'red',
      marginBottom:10,
      alignSelf:'flex-start',
      marginLeft:10,
      textTransform:'capitalize'
    }
  })
  