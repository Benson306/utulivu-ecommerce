import { Entypo, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Cart from '../screens/Cart';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import HomeStack from './HomeStack';

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
           name="Cart" 
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
            tabBarIcon: ({}) =>(
                 <FontAwesome5 name="shopping-cart" size={22} color="#030c3b" />
             )
               
           }}
          />
          <Tab.Screen 
            name="Orders" 
            component={Home}
            options={{
              tabBarLabel:'My Orders',
              tabBarIcon: ({}) =>(
                <Octicons name="checklist" size={22} color="#030c3b" />
              )
                
            }}
          />
          <Tab.Screen 
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({})=>(
                <Ionicons name="person-circle-outline" size={30} color="#030c3b" />
              )
            }}
          />
        </Tab.Navigator>
  )
}
