import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, ToastAndroid, Alert, ActivityIndicatorBase } from 'react-native'
import ApiLink from '../utils/ApiLink';

export default function ViewOrder({ navigation, route }) {

    const { id } = route.params;

    const link = ApiLink();

    const [ pending, setPending ] = useState(true);
    const [ data, setData ] = useState(null);
    const deliveryCharge = 100;

    useEffect(()=>{
        const abortController = new AbortController();

        fetch(`${link}/get_order/${id}`,{signal: abortController.signal })
        .then((res)=>{
            return res.json();
        })
        .then(res =>{
            setData(res)
            setPending(false);
        })
        .catch(err => console.log(err))

        return () => abortController.abort();
    },[])


    const handleClick = () => {
        navigation.navigate('CompletePayment',{id: id})
    }

  return (
    <ScrollView>
    <View style={{marginTop:10}}>
            <View style={styles.card}>
                {
                    pending  && <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30 }}>
                    <ActivityIndicator size='large'  color="#009999"/>
                </View>
                }
                {!pending && <Text style={{marginLeft: 20, marginTop:10, fontSize: 16, fontWeight:'bold', color:'gray'}}>{data.items.length} item(s)</Text> }
                {   data !== null &&
                    data.items.length !== 0 && data.items.map(product =>(
                        <View style={{padding:10}} key={product._id}>
                            <View style={styles.cardContent}>
                                    <Text style={{width:20}}>{product.quantity}</Text>
                                    <Text style={{width:20, fontWeight:'bold'}}>X</Text>
                                    <Text style={{width:190}}>{product.prodName}</Text>
                                    <Text style={{color:'gray'}}>Ksh. {product.quantity * Number(product.price)}</Text>
                            </View>
                        </View>     
                        ))
                }
            </View>
            {
                data !== null && 
            
            <View>
                <View style={styles.card}>
                    <Text style={{marginLeft:9, marginTop:4, fontSize:16, fontWeight: 'bold', alignSelf:'center'}}>Delivery Address</Text>
                    <Text style={{fontSize:18, marginTop:10, marginLeft:10, fontWeight:'bold', color:'#030c3b'}}>County:</Text>
                    <Text style={{fontSize:16, marginTop:10, marginLeft:10, fontWeight:'bold', color:'gray'}}>{data.deliveryCounty}</Text>
                    <Text style={{fontSize:18, marginTop:10, marginLeft:10, fontWeight:'bold', color:'#030c3b'}}>Pickup Location:</Text>
                    <Text style={{fontSize:16, marginTop:10, marginBottom:10, marginLeft:10, fontWeight:'bold', color:'gray'}}>{data.pickupPoint}</Text>
                </View>

                <View style={styles.card}>
                <Text style={{marginLeft:9, marginTop:4, fontSize:16, fontWeight: 'bold', alignSelf:'center'}}>Timelines</Text>
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding:10}}>
                        <Text style={{fontWeight:'bold'}}>Order Date:</Text>
                        <Text>{data.order_date}</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding:10}}>
                        <Text style={{fontWeight:'bold'}}>Delivery Date:</Text>
                        <Text>{data.delivery_date}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding:10}}>
                        <Text style={{fontWeight:'bold'}}>SubTotal:</Text>
                        <Text>{data.total}</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', paddingLeft:10, paddingRight:10}}>
                        <Text style={{fontWeight:'bold'}}>Delivery Charge:</Text>
                        <Text>{deliveryCharge}</Text>
                    </View>
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding:10}}>
                        <Text style={{fontWeight:'bold'}}>Total:</Text>
                        <Text>{data.total + deliveryCharge}</Text>
                    </View>
                </View>

            </View>
            }
        </View>
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
        marginHorizontal:9,
        marginVertical: 5,
        flexDirection:'row'
    }
  })