import { Formik } from 'formik'
import React, { useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Keyboard, Alert, ActivityIndicator } from 'react-native'
import * as yup from 'yup'
import ApiLink from '../utils/ApiLink'

const loginSchema = yup.object({
    fullName: yup.string().required().min(3),
    email: yup.string().required().min(3),
    phoneNumber: yup.string().required().min(10),
    password: yup.string().required().min(6),
    confirmPassword: yup.string()
                        .oneOf([yup.ref('password'), null],"Password does not match")
                        .required()
})

export default function Register({navigation}) {
    const [pending, setPending]= useState(false)

    const link = ApiLink();

    const handleSubmit = (values, action)=>{

        setPending(true);

        data = {
            name: values.fullName,
            email: values.email,
            phone: values.phoneNumber,
            password: values.password
        }
        
        fetch(`${link}/register`,{
            method: 'POST',
            headers: {'content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((response)=>{
            return response.json();
        })
        .then(response=>{
            if(response === 'registered'){
                Alert.alert('Success','You Have succesfully registered as a user',[
                    { text: 'Login', onPress: ()=>{
                        navigation.navigate('Login');
                    } }
                ])
            }else if(response === 'exists'){
                Alert.alert('Failed!!','Credentials Have already been used',[
                    { text: 'Retry', onPress: ()=>{} }
                ])
            }
            setPending(false);
            
        }).catch( (err)=>{
            setPending(false);
            Alert.alert('Network Failed!!','Check Your internet Connection and Try Again',[
                { text: 'OK', onPress: ()=>{} }
            ])
        })
    }
    const handleNav = ()=>{
        navigation.navigate('Login')
    }
  return (
    <View style={styles.container}>
        {
            pending ? 

            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30 }}>
                <ActivityIndicator size='large'  color="#009999"/>
            </View> :
        
        <Formik
            initialValues={{fullName:'', email:'',phoneNumber:'', password:'', confirmPassword:''}}
            validationSchema={loginSchema}
            onSubmit={(values, action)=>{
                Keyboard.dismiss();
                handleSubmit(values, action);
            }}
        >
            {(props)=>(
                <View style={styles.form}>

                    <Text style={styles.label}>Full Name</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Full Name'
                        value={props.values.fullName}
                        onChangeText={props.handleChange('fullName')}
                        onBlur={props.handleBlur('fullName')}
                        blurOnSubmit={true}
                        autoCorrect={false}
                        />
                    <Text style={styles.errorText}>{props.touched.fullName && props.errors.fullName}</Text>
                    
                    <Text style={styles.label}>Email</Text>
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

                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput 
                    style={styles.input}
                    placeholder='Phone Number'
                    value={props.values.phoneNumber}
                    onChangeText={props.handleChange('phoneNumber')}
                    onBlur={props.handleBlur('phoneNumber')}
                    blurOnSubmit={true}
                    autoCorrect={false}
                    />
                    <Text style={styles.errorText}>{props.touched.phoneNumber && props.errors.phoneNumber}</Text>

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={props.values.password}
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        blurOnSubmit={true}
                        autoCorrect={false}
                    />
                    <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                        value={props.values.confirmPassword}
                        onChangeText={props.handleChange('confirmPassword')}
                        onBlur={props.handleBlur('confirmPassword')}
                        blurOnSubmit={true}
                        autoCorrect={false}
                    />
                    <Text style={styles.errorText}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>


                    <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf:'center', padding:8}} onPress={()=>{handleNav()}}>
                        <Text style={{color:'maroon'}}>Already have an account ? <Text style={{fontWeight:'bold', color:'#030c3b'}}>Sign-In</Text></Text>
                    </TouchableOpacity>
                </View>
            )}

        </Formik>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        padding: 10,
        flex:1,
        alignItems:'center'
    },
    form:{
        marginTop:0
    },
    input:{
        padding: 8,
        paddingLeft:15,
        borderBottomWidth:1,
        width: 300,
        margin:5
    },
    button:{
        backgroundColor: 'white',
        padding:10,
        width: 200,
        alignSelf:'center',
        borderRadius:30,
        marginTop:15,
        borderWidth:2
    },
    buttonText:{
        alignSelf:'center',
        color:'#030c3b',
        fontWeight:'bold'
    },
    label:{
        fontSize:15,
        marginHorizontal:1,
        fontWeight:'700'
    },
    errorText:{
        color:'red',
        textTransform:'capitalize'
    }
})