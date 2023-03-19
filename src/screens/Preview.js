import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Image, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import ApiLink from '../utils/ApiLink';

export default function Preview({route, navigation}) {
    const { id } = route.params;
    const link = ApiLink();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);

    const [loading, setLoading] = useState(false)

    useEffect(()=>{

      fetch(`${link}/products/`+id)
      .then((res)=>{
          if(!res.ok){
              setPending(false);
          }else{
              return res.json();
          }
      })
      .then((res)=>{
          setProduct(res);
          setPending(false);
      })
      .catch((err)=>{
          console.log(err)
          setPending(false);
      })

  },[])

  const handleAddToCart = () =>{
    setLoading(true);
        fetch(`${link}/add_cart`,{
            credentials:'include',
            withCredentials: true, 
            proxy: true,
            method:'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ item_id: id })
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
          if(res === 'sent'){

            Alert.alert('Success','Product Has Been Added To Cart',[
                { text: 'OK', onPress: ()=>{} }
            ])

          }else{
            Alert.alert('Failed','Product exists in the Cart',[
                { text: 'OK', onPress: ()=>{} }
            ])
          }
          setLoading(false);
        })
        .catch((err)=>{
              console.log('error');
              setLoading(false);
        })
      
  }

  return (
    <ScrollView>
        {
          pending ?

          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30 }}>
            <ActivityIndicator size='large'  color="#009999"/>
          </View>
          :
          <View>
            <Image source={{uri: `${link}/images/${product.preview1}`}} style={{width: 330, height: 240, objectFit:'scale-down', alignSelf: 'center',marginTop:5, alignSelf:'center'}}/>
            <View style={{flexDirection:'row', justifyContent:'space-evenly', marginHorizontal:40}}>
              <Image source={{uri: `${link}/images/${product.preview1}`}} style={{width: 50, height: 50, objectFit:'scale-down', alignSelf: 'center',marginTop:5, alignSelf:'center'}}/>
              <Image source={{uri: `${link}/images/${product.preview2}`}} style={{width: 50, height: 50, objectFit:'scale-down', alignSelf: 'center',marginTop:5, alignSelf:'center'}}/>
              <Image source={{uri: `${link}/images/${product.preview3}`}} style={{width: 50, height: 50, objectFit:'scale-down', alignSelf: 'center',marginTop:5, alignSelf:'center'}}/>
              <Image source={{uri: `${link}/images/${product.preview4}`}} style={{width: 50, height: 50, objectFit:'scale-down', alignSelf: 'center',marginTop:5, alignSelf:'center'}}/>
            </View>

            <View style={{padding:20}}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:260}}>
                    <Text style={{fontWeight:'bold', fontSize:20, paddingBottom:5}}>{product.prodName}</Text>
                    <Text style={{fontSize:16, paddingBottom:15, color:'gray'}}>Kshs. {product.price}</Text>
                </View>
                {
                  !loading ? 
                
                <TouchableOpacity style={{flexDirection:'row',alignContent:'center', alignSelf:'center', padding:12, backgroundColor:'orange', borderRadius:50}} onPress={()=> handleAddToCart()}>
                    <MaterialIcons name="add-shopping-cart" size={22} color="white" />
                </TouchableOpacity>
                :
                <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:0 }}>
                  <ActivityIndicator size='small'  color="#009999"/>
                </View>

              }
              </View>
              

              <View style={styles.card} key={product._id}>
                  <View style={styles.cardContent}>
                    <Text style={{textTransform:'uppercase', fontWeight:'bold'}}>Specifications</Text>
                    <Text style={{textTransform:'uppercase', fontWeight:'bold', borderWidth:1, padding:5 ,marginTop:8}}>Key Features</Text>
                    <Text style={{borderWidth:1, padding:5, color:'gray' ,marginTop:0}}>{product.features}</Text>

                    <Text style={{textTransform:'uppercase', fontWeight:'bold', borderWidth:1, padding:5 ,marginTop:15}}>Specifications</Text>
                    <Text style={{borderWidth:1, padding:5, color:'gray' ,marginTop:0}}>Weight: {product.weight}</Text>

                    <Text style={{textTransform:'uppercase', fontWeight:'bold', borderWidth:1, padding:5 ,marginTop:15}}>Whats' In The Box</Text>
                    <Text style={{borderWidth:1, padding:5, color:'gray' ,marginTop:0}}>{product.inBox}</Text>
                  </View>
              </View>

              
            </View>
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
      marginHorizontal: 4,
      marginVertical: 0,
      width:310
  },
  cardContent: {
      marginHorizontal:18,
      marginVertical: 10
  }
})