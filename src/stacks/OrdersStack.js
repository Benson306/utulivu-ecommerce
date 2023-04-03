import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CompletedOrders from '../screens/CompletedOrders';
import PendingOrders from '../screens/PendingOrders';

const Tab = createMaterialTopTabNavigator();

export default function OrdersStack() {
  return (
    <Tab.Navigator initialRouteName='Completed'>
      <Tab.Screen 
        name="Completed" 
        component={CompletedOrders}
        options={{
            tabBarLabel:'Completed Orders'
        }}
    />
      <Tab.Screen 
        name="Pending" 
        component={PendingOrders} 
        options={{
            tabBarLabel:'Pending Orders'
        }}
    />
    </Tab.Navigator>
  );
}