import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ApiLink from "../utils/ApiLink";

const CompletedOrders = ({ navigation }) => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const abortCont = new AbortController();

        const link = ApiLink();

        fetch(`${link}/my_order`,{
            credentials: 'include', 
            proxy: true, 
            withCredentials: true, 
            signal: abortCont.signal
        })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setOrders(res);
            setLoading(false);
        })
        .catch(err => console.log(err))

        return ()=> abortCont.abort();
    },[orders])

    let count = 1;
    let deliveryCost = 100;
    return ( 
        <ScrollView>
            {
                loading && 
                <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30 }}>
                    <ActivityIndicator size='large'  color="#009999"/>
                </View>
            }
                { !loading &&
                    orders.map(order => {
                        if(order.completion_status === 'completed'){
                            let number = order.items.length;
                            return <TouchableOpacity 
                            style={styles.card} key={order._id} 
                        >
                            <View style={{width:300}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{width:90}}>id:</Text>
                                    <Text>{order._id}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{width:90}}>Items:</Text>
                                    <Text>{number}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{width:90}}>Items Cost:</Text>
                                    <Text style={{color:'gray'}}>Ksh. {order.total + 100}</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{width:90}}>Date Placed:</Text>
                                    <Text>{order.order_date}</Text>
                                </View>
                                <View style={{flexDirection:'row', justifyContent:'flex-end'}}>
                                <TouchableOpacity 
                                style={{borderWidth:1,borderColor:'#030c3b', padding:5, marginTop:5,borderRadius:25, width:110}}
                                onPress={()=>{
                                    navigation.navigate('ViewOrder',{ id: order._id})
                                }}
                                >
                                    <Text style={{color:'#030c3b', alignSelf:'center'}}>View Order</Text>
                                </TouchableOpacity>
                                </View>
                                
                            </View>       
                        </TouchableOpacity>  
                        }  
                    })
                }
        </ScrollView>
     );
}
 
export default CompletedOrders;

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
        padding:10,
        flexDirection:'row',
        width:330,
        alignSelf:'center'
    }
})