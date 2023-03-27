import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import ApiLink from '../utils/ApiLink';

import useCart from '../context/CartContext';

export default function Cart() {

    const { products }  = useCart();

    const link = ApiLink();

    const { removeFromCart } = useCart();

    const handleRemove = (product) =>{

        removeFromCart(product)

        //     fetch(`${link}/remove_cart/`+id,{
        //         withCredentials:true,
        //         proxy: true,
        //         credentials: 'include',
        //         method: 'DELETE',
        //         headers: {'Content-Type':'application/json'}
        //     })
        //     .then((res)=>{
        //         return res.json();
        //     })
        //     .then(res =>{
        //         if(res === 'deleted'){
        //             Alert.alert('Success','Product Has Been Removed From the Cart',[
        //                 { text: 'OK', onPress: ()=>{} }
        //             ])
        //             setPending(false);
        
        //         }
        //     })
        //     setPending(false);
            // getTotal();
      }
      

  return (
    <ScrollView>
   <View style={{marginTop:10}}>
            <View style={styles.card}>
                {
                    products.length == 0 && <Text style={{padding:20, alignSelf:'center', fontWeight:'bold', fontSize:18}}>Cart is Empty</Text>
                }
                {
                    products.length !== 0 && products.map(product =>(
                        <View style={{borderBottomWidth:1, borderColor:'gray', padding:10}} key={product._id}>
                        <View style={styles.cardContent}>
                            <Image source={{uri: `${link}/images/${product.preview1}`}} style={{height:50, width:50, marginRight:10}} />
                            <View style={{width:200}}>
                                <Text>{product.prodName}</Text>
                                <Text style={{color:'gray'}}>Ksh. {product.price}</Text>
                            </View>
                            <TouchableOpacity style={{alignSelf:'center', marginLeft:20}} 
                                onPress={()=>handleRemove(product)}
                            >
                                <Ionicons name="md-close-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={{marginLeft:15, alignSelf:'center', flexDirection:'row', justifyContent:'space-between'}}>
                                
                                <TouchableOpacity 
                                    style={{borderWidth:1, borderRadius:4, padding:2,alignSelf:'center', backgroundColor:'#cfd6fc'}}
                                    // onPress={()=>{
                                    //     if(data.find(dt => dt.item_id === product._id).quantity > 1){
                                    //         adjustQuantity(product._id, data.find(dt => dt.item_id === product._id).quantity - 1 );
                                    //         getTotal();
                                    //     }
                                        
                                    // }}
                                >
                                    <AntDesign name="minus" size={24} color="black" />
                                </TouchableOpacity>
                                <View>
                                    {/* <Text style={{padding:10, alignSelf:'center'}}>{data.find(dt => dt.item_id === product._id).quantity}</Text>    */}
                                    <Text style={{padding:10, alignSelf:'center'}}>{product.cartQuantity}</Text>
                                </View>
                                <TouchableOpacity 
                                style={{borderWidth:1, borderRadius:5, padding:2,alignSelf:'center', backgroundColor:'#cfd6fc'}}
                                // onPress={()=>{
                                //     adjustQuantity(product._id, data.find(dt => dt.item_id === product._id).quantity + 1 )
                                //     getTotal();
                                // }}
                                >
                                    <Ionicons name="add" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>     
                        ))
                }
            </View>     
   </View>
   {
        products.length !== 0 && 
        <View style={{backgroundColor:'#cfd6fc', alignItems:'center', padding:20, marginTop:10, height:'100%'}}>
            <Text style={{fontWeight:'bold', fontSize:20}}>Total Cost of Goods In Cart:</Text>
            <Text style={{fontSize:18}}>ksh.</Text>
            <TouchableOpacity style={{borderWidth:1, padding:12, borderColor:'gray' ,width:200, alignItems:'center', marginTop:20, borderRadius:15}}>
                <Text style={{color:'#030c3b', fontWeight:'bold', fontSize:16}}>CHECKOUT</Text>
            </TouchableOpacity>
        </View>
    }

   </ScrollView>
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
        marginHorizontal: 8,
        marginVertical: 5,
        marginTop:10
    },
    cardContent: {
        marginHorizontal:18,
        marginVertical: 10,
        flexDirection:'row'
    }
  })