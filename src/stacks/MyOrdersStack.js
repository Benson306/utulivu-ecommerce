import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import CompletePayment from '../screens/CompletePayment';
import ConfirmCompletePayment from '../screens/ConfirmCompletePayment';
import ConfirmPayment from '../screens/ConfirmPayment';
import Payment from '../screens/Payment';
import ViewOrder from '../screens/ViewOrder';
import ViewSummary from '../screens/ViewSummary';
import OrdersTabStack from './OrdersTabStack';
import OrdersStack from './OrdersTabStack';

export default function MyOrdersStack() {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="OrdersTabStack">
        <Stack.Screen
            name="ViewSummary"
            component={ViewSummary}
            options={{
                headerShown: true,
                headerStyle:{
                    backgroundColor:'#cfd6fc'
                },
                headerTitleStyle:{
                    color:'#030c3b',
                    fontWeight:'bold',
                    alignSelf:'center'                  
                },
                headerTitle:'View Summary',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen
            name="OrdersTabStack"
            component={OrdersTabStack}
            options={{
                headerShown: true,
                headerStyle:{
                    backgroundColor:'#cfd6fc'
                },
                headerTitleStyle:{
                    color:'#030c3b',
                    fontWeight:'bold',
                    alignSelf:'center'                  
                },
                headerTitle:'My Orders',
                headerTitleAlign:'center'
            }}
        />
        <Stack.Screen 
            name = "CompletePayment"
            component={CompletePayment}
            options={{
                tabBarLabel:'My Orders',
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
            name = "ConfirmCompletePayment"
            component={ConfirmCompletePayment}
            options={{
                tabBarLabel:'My Orders',
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
        
              
        <Stack.Screen 
            name = "ViewOrder"
            component={ViewOrder}
            options={{
                tabBarLabel:'My Orders',
                headerTitle:'Order Summary',
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
