import { useState } from "react";
import { View , Text, TouchableOpacity, TextInput, Image, ToastAndroid, ScrollView, Alert} from "react-native";
import ApiLink from "../utils/ApiLink";

const ConfirmCompletePayment = ({navigation, route}) => {
    const { id } = route.params;

    const [code, setCode] = useState(null);
    const [pending, setPending] = useState(false);

    const link = ApiLink();

    const handleTextChange = (text) =>{
        setCode(text)
    }

    const handleSubmit = () => {
        setPending(true);
        if(code === null || code === undefined || code.length < 1){
            ToastAndroid.show('Enter Transaction Code!', ToastAndroid.SHORT);   
            return
        }

        fetch(`${link}/confirm_payment`,{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({ code , data: id })
        })
       .then((res)=>{
           return res.json();
       })
       .then((res)=>{
        console.log(res);
           if(res === 'confirmed'){
               Alert.alert('Success','Payment Has Been Confirmed. Our agents will make delivery in 2 Days. Thank you For shopping with Us',[
                { text: 'OK', onPress: ()=>{
                    navigation.navigate('Home')
                } } 
                ])
           }else if(res === 'pending'){
               Alert.alert('Pending','Payment Has Not been received. Try Again in A few minutes',[
                { text: 'OK', onPress: ()=>{
                } } 
                ])

           }else if(res === 'existing'){
               Alert.alert('Failed','MPESA code has already been used to confirm another payment',[
                { text: 'OK', onPress: ()=>{
                } }
                ])
           }
           setPending(false);
           
       })
    } 

    return ( 
        <ScrollView style={{padding:20}} automaticallyAdjustKeyboardInsets={true} showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:50, padding:20}}>
            <Image source={require('../../assets/mpesa.png')} style={{width:150, height:100}}/>
            <Text style={{paddingBottom: 10}}>Now wait to receive your MPESA message. </Text>
            <Text style={{paddingBottom: 10, alignSelf:'center'}}>Enter the MPESA Transaction Code in the input below and click on Confirm Payment.</Text>

            <TextInput placeholder="OCK1W5SQ8H" onChangeText={handleTextChange} style={{borderBottomWidth:1, margin:20, padding:10, width: 200, textAlign:'center', textAlignVertical:'center'}} />
            

            <TouchableOpacity
            style={{borderWidth:1, backgroundColor:'#030c3b',borderColor: '#030c3b', width:150, borderRadius: 25,alignSelf:'center', marginTop:10, marginBotton: 20, padding:10}}
            onPress={()=>{
                handleSubmit();
            }}
         >
            { !pending &&  <Text style={{color:'white', alignSelf:'center'}}>Confirm Payment</Text> }
            { pending && <Text style={{color:'white', alignSelf:'center'}}>Loading....</Text> }
            </TouchableOpacity>


            <TouchableOpacity
                style={{borderWidth:1, borderColor: '#030c3b', width:150, borderRadius: 25,alignSelf:'center', marginTop:10, marginBotton: 20, padding:10}}
                onPress={()=>{
                    navigation.navigate('Home');
                }}
            >
                <Text style={{color:'#030c3b', alignSelf:'center'}}>Cancel</Text>
            
         </TouchableOpacity>
        </View>
        </ScrollView>
     );
}
 
export default ConfirmCompletePayment;