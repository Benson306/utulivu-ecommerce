import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import ApiLink from '../utils/ApiLink';

import useCart from '../context/CartContext';
import { SliderBox } from 'react-native-image-slider-box';


export default function Preview({route, navigation}) {
    const { id } = route.params;
    const link = ApiLink();

    const [product, setProduct] = useState([]);
    const [pending , setPending] = useState(true);

    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([]);

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

          setImages([`${link}/images/${res.preview1}`, `${link}/images/${res.preview2}`, `${link}/images/${res.preview3}`, `${link}/images/${res.preview4}` ]);

          setPending(false);
      })
      .catch((err)=>{
          setPending(false);
      })

  },[])

  const { addToCart } = useCart();

  const handleAddToCart = (product) =>{
    setLoading(true);
    addToCart(product);
    setLoading(false); 
    navigation.navigate("Home")
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
            {/* Slider */}
            <View style={{backgroundColor:'white'}}>
              <SliderBox images={images} dotStyle={{}} dotColor="orange"  imageLoadingColor="orange" resizeMethod={'resize'} resizeMode={"contain"} imageComponentStyle={{objectFit:'scale-down'}} inactiveDotColor="#cfd6fc"  />
              
            </View>
            
  
            <View style={{padding:20}}>
              <View style={{flexDirection:'row'}}>
                <View style={{width:260}}>
                    <Text style={{fontWeight:'bold', fontSize:20, paddingBottom:5}}>{product.prodName}</Text>
                    <Text style={{fontSize:16, paddingBottom:15, color:'gray'}}>Kshs. {product.price}</Text>
                </View>
                {
                  !loading ? 
                
                <TouchableOpacity style={{flexDirection:'row',alignContent:'center', alignSelf:'center', padding:12, backgroundColor:'orange', borderRadius:50}} onPress={()=> handleAddToCart(product)}>
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