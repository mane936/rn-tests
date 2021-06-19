import React, {FC} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {Home, Dashboard, Item} from '../screens';
const {Navigator, Screen} = createStackNavigator();

const AppStack : FC = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home}/>
      <Screen name="dashboard" component={Dashboard} />
      <Screen name="item" component={Item} />
    </Navigator>
  )
}

export default AppStack;

