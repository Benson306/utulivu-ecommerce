import { Ionicons } from '@expo/vector-icons';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native'
import ApiLink from '../utils/ApiLink';

export default function Cart() {


    const [products, setProducts] = useState([]);
    const [pending , setPending] = useState(true);

    const [newPrice, setNewPrice] = useState(0);
    const [data, setData ] = useState([]);

    const link = ApiLink();

    useEffect(()=>{
        fetch(`${link}/cart`, {
            credentials: 'include',
            withCredentials: true,
            proxy: true
        })
        .then((res)=>{
            if(!res.ok){
                setPending(false);

            }else{
                return res.json();
            }
        })
        .then((res)=>{
            setProducts(res);
            if(res.length === 0){

            }else{
                let prc = 0;
                res.map(r =>{
                prc += Number(r.price);
                addData(r._id, r.price, 1);
                })
                setNewPrice(prc);
            }    
            setPending(false);
        })
        .catch((err)=>{
            console.log(err)
            setPending(false);
        })

    },[products])
    
 
    function getTotal(){
        let prc = 0;
        data.map(r =>{
            prc += Number(r.price*r.quantity);
        });
        setNewPrice(prc);
    }

    const addData = (item_id, price, quantity) =>{
        let newData = {item_id, price, quantity};
        setData(prevArray => [...prevArray, newData]);
    }

    const changeData = (item_id, quantity) =>{
        data.forEach(dt=>{
            if(dt.item_id === item_id ){
                dt.quantity = Number(quantity);
            }
        })
    }


      const handleRemove = (id) =>{

            fetch(`${link}/remove_cart/`+id,{
                withCredentials:true,
                proxy: true,
                credentials: 'include',
                method: 'DELETE',
                headers: {'Content-Type':'application/json'}
            })
            .then((res)=>{
                return res.json();
            })
            .then(res =>{
                if(res === 'deleted'){
                    Alert.alert('Success','Product Has Been Removed From the Cart',[
                        { text: 'OK', onPress: ()=>{} }
                    ])
        
                }
            })
      }
      
      const handleClick = (e)=>{
        // history.push({
        //     pathname: '/summary',
        //     state: data
        // })
        // hideSpinner();
      }
  return (
    <ScrollView>
   <View style={{marginTop:10}}>
        {
            pending ? 
            <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:0 }}>
                  <ActivityIndicator size='small'  color="#009999"/>
            </View>
            :
            <View style={styles.card}>
                {
                    products.map(product =>(
                        <View style={styles.cardContent}>
                            <Image source={{uri: `${link}/images/${product.preview1}`}} style={{height:50, width:50, marginRight:10}} />
                            <View style={{width:150}}>
                                <Text>{product.prodName}</Text>
                                <Text style={{color:'gray'}}>Ksh. {product.price}</Text>
                            </View>
                            <View style={{marginLeft:15, alignSelf:'center'}}>
                                <Formik 
                                initialValues={{quantity: 1}}
                                >
                                {(props)=>(
                                    <TextInput 
                                        keyboardType='numeric' 
                                        placeholder='Qty' 
                                        value={props.values.quantity} 
                                        style={{
                                            borderWidth:1, 
                                            borderRadius:10, 
                                            padding:5, 
                                            alignSelf:'center'
                                        }}
                                        onChangeText={(text)=>{
                                            let number = parseInt(text);
                                            console.log(number)
                                            number < 1 || number === 'NaN'  ?   changeData(product._id, 1) : changeData(product._id, number) ;
                                            getTotal();
                                        }}
                                    
                                    />
                                )}

                                </Formik>
                            </View>
                            <TouchableOpacity style={{alignSelf:'center', marginLeft:30}} onPress={()=>handleRemove(product._id)}>
                                <Ionicons name="md-close-outline" size={24} color="black" />
                            </TouchableOpacity>

                        </View>     
                        ))
                }
            </View>       
        }
   </View>
   <View style={{backgroundColor:'#cfd6fc', alignItems:'center', padding:20, marginTop:10, height:'100%'}}>
        <Text style={{fontWeight:'bold', fontSize:20}}>Total Cost of Goods In Cart:</Text>
        <Text style={{fontSize:18}}>ksh. {newPrice}</Text>
        <TouchableOpacity style={{borderWidth:1, padding:12, borderColor:'gray' ,width:200, alignItems:'center', marginTop:20, borderRadius:15}}>
            <Text style={{color:'#030c3b', fontWeight:'bold', fontSize:16}}>CHECKOUT</Text>
        </TouchableOpacity>
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
        marginHorizontal:18,
        marginVertical: 10,
        flexDirection:'row'
    }
  })