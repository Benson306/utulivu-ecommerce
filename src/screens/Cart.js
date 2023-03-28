import { AntDesign, Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import useCart from '../context/CartContext';
import ApiLink from '../utils/ApiLink';

export default function Cart({ navigation }) {

    const { products, addQuantity, minusQuantity, removeFromCart, total }  = useCart();

    const link = ApiLink();

    const handleRemove = (product) =>{
        removeFromCart(product)
    }

    const handleAddQuantity = (id) =>{
        addQuantity(id);
    }

    const handleMinusQuantity = (id) =>{
        minusQuantity(id);
    }

    const handleCheckout = () =>{
        navigation.navigate("Summary");
    }


  return (
    <ScrollView>
   <View style={{marginTop:10}}>
   {
                    products.length !== 0 && 
    <Text style={{marginLeft: 20, fontSize: 20, fontWeight:'bold', color:'gray'}}>{products.length} item(s)</Text>
   }
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
                                    onPress={()=>{
                                        handleMinusQuantity(product._id);
                                    }}
                                >
                                    <AntDesign name="minus" size={24} color="black" />
                                </TouchableOpacity>
                                <View>
                                    <Text style={{padding:10, alignSelf:'center'}}>{product.quantity}</Text>
                                </View>
                                <TouchableOpacity 
                                style={{borderWidth:1, borderRadius:5, padding:2,alignSelf:'center', backgroundColor:'#cfd6fc'}}
                                onPress={()=>{
                                    handleAddQuantity(product._id);
                                }}
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
            <Text style={{fontWeight:'bold', fontSize:18}}>Cart Total:</Text>
            <Text style={{fontSize:16}}>ksh. {total}</Text>
            <TouchableOpacity 
            style={{borderWidth:1, padding:12, borderColor:'gray' ,width:200, alignItems:'center', marginTop:20, borderRadius:15}}
            onPress={()=>{
                handleCheckout();
            }}
            >
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