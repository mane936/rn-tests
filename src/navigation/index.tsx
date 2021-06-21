/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
const {useState, useEffect} = React;
import { ColorSchemeName } from 'react-native';
import firebase from 'firebase'

import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const [user, setUser] = useState<any>(null);

  const checkUser =() => {
    firebase.auth().onAuthStateChanged(_user => {
      setUser(_user) 
    })
  }

  useEffect(() => {
    checkUser();
  },[])

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {user !== null ? <AppStack/> : <AuthStack />}

      {/* <RootNavigator /> */}
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
