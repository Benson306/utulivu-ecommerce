import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "../screens/Cart";
import OrderSummary from "../screens/OrderSummary";



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
        </Stack.Navigator>
    )

}