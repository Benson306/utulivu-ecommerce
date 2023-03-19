import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import AppNav from './src/stacks/AppNav';
import AuthStack from './src/stacks/AuthStack';

export default function App() {
  return (
   <AuthProvider>
      <AppNav />
   </AuthProvider>
  );
}

