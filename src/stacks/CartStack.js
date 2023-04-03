import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart";
import ConfirmPayment from "../screens/ConfirmPayment";
import OrderSummary from "../screens/OrderSummary";
import Payment from "../screens/Payment";



export default function CartStack(){

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Orders">
            <Stack.Screen
            name = "Cart"
            component={Cart}
            options={{
                tabBarLabel:'Cart',
                headerTitle:'My Cart',
                headerStyle:{
                 backgroundColor:'#cfd6fc'
               },
               headerTitleStyle:{
                 color:'#030c3b',
                 fontWeight:'bold'
               },
               headerTitleAlign:'center',                  
              }}
            />
            <Stack.Screen 
            name = "Summary"
            component={OrderSummary}
            options={{
                tabBarLabel:'Cart',
                headerTitle:'Checkout',
                headerStyle:{
                 backgroundColor:'#cfd6fc'
               },
               headerTitleStyle:{
                 color:'#030c3b',
                 fontWeight:'bold'
               },
               headerTitleAlign:'center',
              }}
            />

          <Stack.Screen 
            name = "Payment"
            component={Payment}
            options={{
                tabBarLabel:'Cart',
                headerTitle:'Complete Order',
                headerStyle:{
                 backgroundColor:'#cfd6fc'
               },
               headerTitleStyle:{
                 color:'#030c3b',
                 fontWeight:'bold'
               },
               headerBackVisible: false,
               headerTitleAlign:'center',
              }}
            />

          <Stack.Screen 
            name = "ConfirmPayment"
            component={ConfirmPayment}
            options={{
                tabBarLabel:'Cart',
                headerTitle:'Confirm Payment',
                headerStyle:{
                 backgroundColor:'#cfd6fc'
               },
               headerTitleStyle:{
                 color:'#030c3b',
                 fontWeight:'bold'
               },
               headerBackVisible: false,
               headerTitleAlign:'center',
              }}
            />
        </Stack.Navigator>
    )

}