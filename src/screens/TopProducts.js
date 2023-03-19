import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ApiLink from '../utils/ApiLink';

export default function TopProducts({ navigation }) {

    const [products, setProducts] = useState([]);
    const [isPending, setPending] = useState(true);

    const link = ApiLink();

    useEffect(()=>{
        

        fetch(`${link}/products`)
        .then(res=>{
            if(res.ok){
                return res.json();
            }else{
                throw Error('Could Not Fetch Data');
            }
        })
        .then(res=>{
            setProducts(res);
            setPending(false);
        })
        .catch(err =>{
            setPending(false);
        })

    },[]);


  return (
        <ScrollView style={{marginBottom:200}}>
            <View style={styles.row}>
            {
                products.length === 0 ?
                    <Text>No Products Found</Text>
                :

                products.map(product =>(
                <TouchableOpacity onPress={()=> navigation.navigate('Preview', {id: product._id}) }>
                <View style={styles.row}>
                    <View style={styles.card} key={product._id}>
                        <View style={styles.cardContent}>
                        <Image source={{uri: `${link}/images/${product.preview1}`}} style={{width: 120, height: 100, objectFit:'scale-down', alignSelf: 'center',marginTop:5, alignSelf:'center'}}/>
                        <Text style={{height:40, marginTop:5, fontWeight:'bold', fontSize:16, textAlign:'center'}}>{product.prodName}</Text>
                        <Text style={{textAlign:'center'}}>Ksh. {product.price}</Text>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                ))


            }
            </View>
        </ScrollView>      
)
}

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor:'#fff',
        shadowOffset: {width:1, height:1},
        shadowColor:'#333',
        shadowOpacity: 0.3,
        shadowRadius:2,
        marginHorizontal: 4,
        marginVertical: 6,
        width:170,
        height:190
    },
    cardContent: {
        marginHorizontal:18,
        marginVertical: 10
    }
})
