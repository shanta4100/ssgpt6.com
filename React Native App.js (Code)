import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import GameLauncher from './src/screens/GameLauncher';
import Subscription from './src/screens/Subscription';
import Accessibility from './src/screens/Accessibility';
import Languages from './src/screens/Languages';
import FamilyMode from './src/screens/FamilyMode';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Games" component={GameLauncher} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="Accessibility" component={Accessibility} />
        <Stack.Screen name="Languages" component={Languages} />
        <Stack.Screen name="FamilyMode" component={FamilyMode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
