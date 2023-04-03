import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import ApiLink from "../utils/ApiLink";

const Search = ({ navigation }) => {

    const [products, setProducts] = useState([]);
    const [isPending, setPending] = useState(true);
    const [query, setQuery] = useState(null);

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

    const filteredData = products.filter((product)=>{
                    
        if(query === '' || query === null){
            return product;
        }else if(
            product.prodName.toLowerCase().includes(query.toLowerCase()) ||
            product.categ.toLowerCase().includes(query.toLowerCase())
        ){
            return product;
        }
    })

    const handleQuery = (text) =>{
        setQuery(text);
    }

    return (  
    <View style={{marginBottom:60}}>
        <View style={{
            flexDirection:'row' , 
            alignSelf:'center',
            alignItems:'center',
            backgroundColor:'white',
            padding:5,
            borderRadius:5,
            borderBottomWidth:1,
            borderColor:'gray'
        }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput onChangeText={handleQuery} style={{backgroundColor:'white', padding: 10, width:320, fontSize:16}} placeholder='Search...'/>
        </View>
        <ScrollView>
        <View style={{marginTop:10}}>
            
                {
                    filteredData.length == 0 && <Text style={{padding:20, alignSelf:'center', fontWeight:'bold', fontSize:18}}></Text>
                }
                {
                    filteredData.length !== 0 && filteredData.slice(0,7).map(product =>(
                    <TouchableOpacity 
                        style={styles.card} key={product._id} 
                        onPress={()=> navigation.navigate('Preview',{ id: product._id})}
                    >
                        <Image source={{uri: `${link}/images/${product.preview1}`}} style={{height:50, width:50, marginRight:10}} />
                        <View style={{width:400}}>
                            <Text>{product.prodName}</Text>
                            <Text style={{color:'gray'}}>Ksh. {product.price}</Text>
                        </View>       
                    </TouchableOpacity>    
                        ))
                }
            </View>    
        </ScrollView>


    </View>);
}
 
export default Search;

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
        marginVertical: 6,
        padding:20,
        flexDirection:'row',
        width:320,
        alignSelf:'center'
    }
})