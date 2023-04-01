import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import useCart from '../context/CartContext';
import ApiLink from '../utils/ApiLink';

export default function OrderSummary({ navigation }) {

    const { products, total }  = useCart();

    const link = ApiLink();

    const [ county, setCounty ] = useState("");
    const [ counties, setCounties ] = useState([]);

    const [ pickup, setPickup ] = useState([]);
    const [ location, setLocation ] = useState("");

    const [ loading , setLoading ] = useState(false)
    const [pending, setPending ] = useState(true);

    const deliveryCharge = 100;

    useEffect(()=>{
        setLoading(true)
        const abortController = new AbortController();

        fetch(`${link}/county`,{signal: abortController.signal})
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                setLoading(false);
            }
        })
        .then(res =>{
            setLoading(false);
            let result = [];
            res.forEach( r =>{
                result.push(r.county)
            })
            uniqueData = [...new Set(result)];
            setCounties(uniqueData);
            setCounty("Nairobi")
        })
        .catch((err)=>{
            setLoading(false);
        })
        
        return () => abortController.abort();
    },[])

    useEffect(()=>{
        setPending(true)
        const abortController = new AbortController();

        fetch(`${link}/county/`+county ,{signal: abortController.signal})
        .then((res)=>{
            if(res.ok){
                return res.json();
            }else{
                setPending(false);
            }
        })
        .then(res =>{
            setPending(false);
            let result = [];
            res.forEach( r =>{
                result.push(r.location)
            })
            let uniqData = [...new Set(result)];
            setPickup(uniqData);
        })
        .catch((err)=>{
            setPending(false);
        })

        return () => abortController.abort();  
    },[county])

  return (
    <ScrollView>
   <View style={{marginTop:10}}>
            <View style={styles.card}>
                {
                    products.length == 0 && <Text style={{padding:20, alignSelf:'center', fontWeight:'bold', fontSize:18}}>Cart is Empty</Text>
                }
                <Text style={{marginLeft: 20, marginTop:10, fontSize: 16, fontWeight:'bold', color:'gray'}}>{products.length} item(s)</Text>
                {
                    products.length !== 0 && products.map(product =>(
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
                counties.length === 0 && 
                <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30 }}>
                    <ActivityIndicator size='large'  color="#009999"/>
                </View> 
            }
            {
                counties.length > 0 && 
                <View style={styles.card}>
                    <Text style={{marginLeft:9, marginTop:4, fontSize:16, fontWeight: 'bold', alignSelf:'center'}}>Set Delivery Address</Text>
                        <View>
                            <Text style={{fontSize:16, marginTop:10, marginLeft:10, fontWeight:'bold', color:'#030c3b'}}>Select County:</Text>
                            
                            <Picker
                                selectedValue={county}
                                onValueChange={(itemValue, itemIndex)=>{
                                    setCounty(itemValue)
                                }}
                            >
                            {
                                counties.map(cty => (
                                    <Picker.Item label={cty} value={cty} key={cty}/>
                                ))
                            }
                            </Picker>


                            { pickup.length !== 0 && <View>
                                    <Text style={{fontSize:16, marginTop:10, marginLeft:10, fontWeight:'bold', color:'#030c3b'}}>Select Pickup Location:</Text>
                                    {
                                        pending && <View style={{ margin:10 }}>
                                                        <ActivityIndicator size='small'  color="#009999"/>
                                                    </View> 
                                    }
                                    { !pending && <Picker
                                        selectedValue={location}
                                        onValueChange={(itemValue, itemIndex)=>{
                                            setLocation(itemValue)
                                        }}
                                    >
                                    {
                                         pickup.map(cty => (
                                            <Picker.Item label={cty} value={cty} key={cty}/>
                                        ))
                                    }
                                    </Picker> }
                            </View>
                            }
                        </View>
                </View>
            }
            <View style={styles.card}>
                <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding:10}}>
                    <Text style={{fontWeight:'bold'}}>SubTotal:</Text>
                    <Text>{total}</Text>
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', paddingLeft:10, paddingRight:10}}>
                    <Text style={{fontWeight:'bold'}}>Delivery Charge:</Text>
                    <Text>{deliveryCharge}</Text>
                </View>
                <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', padding:10}}>
                    <Text style={{fontWeight:'bold'}}>Total:</Text>
                    <Text>{total + deliveryCharge}</Text>
                </View>
                <TouchableOpacity style={{width:300, alignSelf:'center', backgroundColor:'#030c3b', padding:10, marginBottom:10, borderRadius:20}}>
                    <Text style={{color:'white', alignSelf:'center'}}>Pay Ksh. {total + deliveryCharge }</Text>
                </TouchableOpacity>
            </View>
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