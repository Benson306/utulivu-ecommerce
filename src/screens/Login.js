import { Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Keyboard, Alert, ActivityIndicator } from 'react-native'
import * as yup from 'yup'
import { AuthContext } from '../context/AuthContext'
import ApiLink from '../utils/ApiLink'

const loginSchema = yup.object({
    email: yup.string().required().min(3),
    password: yup.string().required().min(3)
})

export default function Login( { navigation }) {

    const link = ApiLink();

    const { login } = useContext(AuthContext); 

    const [pending, setPending] = useState(false)
    
    const handleSubmit = (values, action)=>{
        setPending(true);
        let data = {
            email: values.email,
            password: values.password
        }

        fetch(`${link}/login`,{
            credentials: 'include', 
            proxy: true, 
            withCredentials: true,
            method:'POST',
            headers: {'content-Type':'application/json'},
            body: JSON.stringify(data)
        })
        .then((data)=>{
            return data.json();
        })
        .then((data)=>{
            if(data==='failed'){
                Alert.alert('Oops!','Invalid Credentials',[
                    { text: 'dismiss', onPress: ()=>{} }
                ])
            }else{
                login(values.email)
            }
            setPending(false);
        })
        .catch((err)=>{
            Alert.alert('Network Failed!!','Check Your internet Connection and Try Again',[
                { text: 'OK', onPress: ()=>{} }
            ])
            setPending(false)
        })
    }
    const handleNav = ()=>{
        navigation.navigate('Register')
    }
  return (
    <View style={styles.container}>
        {
            
        pending ?

        <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30 }}>
            <ActivityIndicator size='large'  color="#009999"/>
        </View> :

       
        <Formik
            initialValues={{email:'', password:''}}
            validationSchema={loginSchema}
            onSubmit={(values, action)=>{
                Keyboard.dismiss();
                handleSubmit(values, action);
            }}
        >
            {(props)=>(
                <View style={styles.form}>
                    <Text style={{margin: 5, fontSize:30, fontWeight:'900'}}>Log-in</Text>

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

                    <TouchableOpacity style={{alignSelf:'flex-end', padding:8}}>
                        <Text style={{color:'gray'}}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf:'center', padding:8}} onPress={()=>{handleNav()}}>
                        <Text style={{color:'maroon'}}>Don't have an account ? <Text style={{fontWeight:'bold', color:'#030c3b'}}>Sign-Up</Text></Text>
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
        marginTop:30,
        padding: 10,
        flex:1,
        alignItems:'center'
    },
    form:{
        marginTop:230
    },
    input:{
        padding: 8,
        paddingLeft:15,
        borderBottomWidth:1,
        width: 300,
        margin:5
    },
    button:{
        backgroundColor: '#030c3b',
        padding:15,
        width: 250,
        alignSelf:'center',
        borderRadius:30,
        marginTop:15
    },
    buttonText:{
        alignSelf:'center',
        color:'white',
        fontWeight:'bold'
    },
    label:{
        fontSize:17,
        marginHorizontal:1,
        fontWeight:'700'
    },
    errorText:{
        color:'red',
        textTransform:'capitalize'
    }
})