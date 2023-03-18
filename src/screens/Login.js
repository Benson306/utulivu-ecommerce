import { Formik } from 'formik'
import React from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Keyboard } from 'react-native'
import * as yup from 'yup'

const loginSchema = yup.object({
    email: yup.string().required().min(3),
    password: yup.string().required().min(3)
})

export default function Login() {

    const handleSubmit = (values, action)=>{
        console.log(values)
    }
  return (
    <View style={styles.container}>
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
                        />

                    <Text style={styles.errorText}>{props.touched.email && props.errors.email}</Text>

                    <Text style={styles.label}>Password</Text>

                    <TextInput
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={props.values.password}
                        onChangeText={props.handleChange('password')}
                    />

                    <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

                    <TouchableOpacity style={{alignSelf:'flex-end', padding:8}}>
                        <Text style={{color:'gray'}}>Forgot password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{alignSelf:'center', padding:8}}>
                        <Text style={{color:'maroon'}}>Don't have an account ? <Text style={{fontWeight:'bold', color:'#030c3b'}}>Sign-Up</Text></Text>
                    </TouchableOpacity>
                </View>
            )}

        </Formik>
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
        fontSize:20,
        marginHorizontal:10,
        fontWeight:'700'
    },
    errorText:{
        color:'red',
        margin:1,
        textTransform:'capitalize'
    }
})