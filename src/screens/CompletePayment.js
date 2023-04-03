import { useEffect, useState } from "react";
import { View,Text, TextInput, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import ApiLink from "../utils/ApiLink";

const CompletePayment = ({ navigation, route}) => {
    const { id } = route.params;

    const link = ApiLink();

    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [phone, setPhone] = useState(0)
    const [pending, setPending] = useState(false);

    const deliveryFee = 100;

    useEffect(()=>{
        const abortCont = new AbortController();

        fetch(`${link}/get_order/${id}`, {signal: abortCont.signal})
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            setPrice(res.total)
            setLoading(false);
        })
        
    },[])

    const [clickable, setClickable] = useState(false);
    const checkNumber = (num) =>{
        if(num.length === 12 && num.startsWith("254")){
            setClickable(true);
            setPhone(num);
        }else{
            setClickable(false);
        }
    }

    const handleTextChange = (text) =>{
        checkNumber(text)
    }

    const handleStk =  () =>{
        setPending(true);
         fetch(`${link}/stk_push`,{
             credentials: 'include',
             proxy: true, 
             withCredentials: true,
             method: 'POST',
             headers: {'Content-Type':'application/json'},
             body: JSON.stringify({ phone, order_id: id })
         })
        .then((res)=>{
            return res.json();
        })
        .then((res)=>{
            Alert.alert('Success','MPESA payment request has been sent to your number. Enter PIN to proceed',[
                { text: 'OK', onPress: ()=>{
                    navigation.navigate('ConfirmCompletePayment',{id: id})
                } }
            ])
            setPending(false);
        })

    }
    return ( 
        <View>
    <ScrollView style={{padding:20}} automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <Image source={require('../../assets/mpesa.png')} style={{width:150, height:100}}/>

            <Text style={{paddingBottom:10}}>We accept payments through MPESA.</Text>

            <Text>Insert you MPESA phone number below and click on Pay to initiate an MPESA STK PUSH notification.</Text>

            <Text style={{marginTop: 10}}>Amount To Be Paid:</Text>

            { !loading && <Text style={{fontWeight:'bold', fontSize: 20}}>{price + deliveryFee}</Text> }

            { loading && <Text>Loading....</Text>}

            <TextInput placeholder="Phone Number" onChangeText={handleTextChange} keyboardType='numeric' style={{borderBottomWidth:1, margin:20, padding:10, width: 200, textAlign:'center', textAlignVertical:'center'}} />
            { !clickable && <Text style={{color:'red'}}>Number should start with 254 and have 12 digits.</Text>}
        </View>
        
        
        { clickable && <TouchableOpacity 
                            style={{backgroundColor: '#030c3b', width:100, borderRadius: 25,alignSelf:'center', padding:10}}
                            onPress={()=>{
                                handleStk();
                            }}
                            >
                        { !pending && <Text style={{color:'white', alignSelf:'center'}}>Pay</Text>}
                        { pending && <Text style={{color:'white', alignSelf:'center'}}>Loading ....</Text> }
                    </TouchableOpacity>
        }
         
         <TouchableOpacity
            style={{borderWidth:1, borderColor: '#030c3b', width:150, borderRadius: 25,alignSelf:'center', marginTop:10, marginBotton: 20, padding:10}}
            onPress={()=>{
                navigation.navigate('Home');
            }}
         >
            <Text style={{color:'#030c3b', alignSelf:'center'}}>Cancel Payment</Text>
         </TouchableOpacity>
    </ScrollView>
    </View> );
}
 
export default CompletePayment;