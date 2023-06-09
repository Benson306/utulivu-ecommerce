import { Entypo, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Home from '../screens/Home';
import Orders from '../screens/Orders';
import Profile from '../screens/EditProfile';
import CartStack from './CartStack';
import HomeStack from './HomeStack';
import MyOrdersStack from './MyOrdersStack';
import OrdersStack from './OrdersTabStack';
import ProfileStack from './ProfileStack';

export default function AppStack() {
    const Tab = createBottomTabNavigator();
  return (
        <Tab.Navigator initialRouteName='HomeScreen'>
          <Tab.Screen 
            name="HomeScreen"
            component={HomeStack}
            options={{
              tabBarLabel:'Home',
              headerTitle:'Home',
              headerShown:false,
              headerStyle:{
                backgroundColor:'#cfd6fc'
              },
              headerTitleStyle:{
                color:'#030c3b',
                fontWeight:'bold'
              },
              tabBarIcon: ({}) =>(
                  <Entypo name="home" size={24} color="#030c3b" />
              )
                
            }}
          />
          <Tab.Screen 
           name="CartStack" 
           component={CartStack}
           options={{
             tabBarLabel:'Cart',
             headerShown: false,
            tabBarIcon: ({}) =>(
                 <FontAwesome5 name="shopping-cart" size={22} color="#030c3b" />
             )
               
           }}
          />
          <Tab.Screen 
            name="Orders" 
            component={MyOrdersStack}
            options={{
              tabBarLabel:'My Orders',
              tabBarIcon: ({}) =>(
                <Octicons name="checklist" size={22} color="#030c3b" />
              ),
              headerShown: false,
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
          <Tab.Screen 
            name="ProfileStack"
            component={ProfileStack}
            options={{
              tabBarLabel: 'Profile',
              headerShown: false,
              tabBarIcon: ({})=>(
                <Ionicons name="person-circle-outline" size={30} color="#030c3b" />
              )
            }}
          />
        </Tab.Navigator>
  )
}
