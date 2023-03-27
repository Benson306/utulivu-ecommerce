import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import AppNav from './src/stacks/AppNav';
import AuthStack from './src/stacks/AuthStack';

export default function App() {
  return (
   <AuthProvider>
    <CartProvider>
      <AppNav />
    </CartProvider>
   </AuthProvider>
  );
}

