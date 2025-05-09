import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Loading from './loading';
import Loginflow from './(tabs)/login';
import HomeScreen from './(tabs)/home';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="loading" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Loginflow} />
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}