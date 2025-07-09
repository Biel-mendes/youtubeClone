import 'react-native-reanimated'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VideoListScreen from './screens/VideoListScreen';
import VideoUploadScreen from './screens/VideoUploadScreen';
import VideoDetailScreen from './screens/VideoDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="VideoList" component={VideoListScreen} options={{ title: 'Vídeos' }} />
        <Stack.Screen name="Upload" component={VideoUploadScreen} options={{ title: 'Novo Vídeo' }} />
        <Stack.Screen name="VideoDetail" component={VideoDetailScreen} options={{ title: 'Detalhes do Vídeo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
