import { Formik } from 'formik';
import React, { useState } from 'react'
import { ActivityIndicator, Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import ApiLink from '../utils/ApiLink';
import * as yup from 'yup'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTogglePasswordVisibility } from '../utils/useTogglePasswordVisibility';

const profileSchema = yup.object({
    name: yup.string().required().min(3),
    email: yup.string().email().required().min(3),
    phone: yup.string().required().length(10),
    password: yup.string().required().min(5),

})

export default function EditProfile({route, navigation}){

    const { _id, email, name, password, phone } = route.params;

    const link = ApiLink();

    const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility();

    const [ loading, setLoading ] = useState(false);

    const handleSubmit = (values) =>{

      const { name, email, phone, password } = values;

      setLoading(true);

          fetch(`${link}/edit_profile`,{
              credentials: 'include', 
              proxy: true, 
              withCredentials: true,
              method: 'PUT',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({ name, email, phone, password })
          })
          .then((res)=>{
              if(res.ok){
                  setLoading(false);
                  navigation.navigate('ProfileHome')
              }else{
                  setLoading(false);
              }
          })
          .catch(err =>{
              setLoading(false);
          })

      }

    return ( 

    <View style={{flex: 1}}>
      <ScrollView>
      <View style={{flex:1, margin: 10}}>
             
        <View style={styles.card}>
          <Text style={{alignSelf:'center', fontSize:18, fontWeight:'bold'}}>Edit Account Details</Text>

          <Formik
            initialValues={{ name: name, email: email, phone: phone, password: password}}
            validationSchema={profileSchema}
            onSubmit={((values, actions)=>{
                Keyboard.dismiss();
                handleSubmit(values);
            })}

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
                keyboardType='numeric'
                />
              <Text style={styles.errorText}>{props.touched.phone && props.errors.phone}</Text>

              <Text style={styles.labels}>Password:</Text>

              <View style={{flexDirection:'row', borderBottomWidth:1, padding:5, marginLeft:5}}>
                  <TextInput
                    style={styles.inputPass}
                    placeholder='Password'
                    value={props.values.password}
                    onChangeText={props.handleChange('password')}
                    onBlur={props.handleBlur('password')}
                    blurOnSubmit={true}
                    autoCorrect={false}
                    secureTextEntry={passwordVisibility}
                    />
        
                  <Pressable onPress={handlePasswordVisibility} >
                    <MaterialCommunityIcons name={rightIcon} size={24} color="black" />
                  </Pressable>
                  
              </View>

              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>
              
                  
                  
                    <TouchableOpacity onPress={props.handleSubmit} style={styles.button}>
                      {
                        loading &&
                        <View style={{justifyContent:'center', alignItems:'center', padding:10}}>
                            <ActivityIndicator size='small'  color="white"/>
                        </View>
                      }
                      { 
                        !loading && 
                          <Text style={styles.buttonText}>Save Profile Details</Text>

                      }
                    </TouchableOpacity>
              

          </View> 
        
        )}
          </Formik>
          
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
     fontSize: 16,
     padding: 5,
     color:'maroon',
     fontWeight:'bold'
    },
    values:{
      fontSize: 16,
      padding: 5,
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
    inputPass:{
      marginLeft:10,
      width: 250
    },
    errorText:{
      color:'red',
      marginBottom:10,
      alignSelf:'flex-start',
      marginLeft:10,
      textTransform:'capitalize'
    }
  })
  