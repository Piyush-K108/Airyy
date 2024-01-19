import { View, Text } from 'react-native'
import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Screens/Home';
import BottomTabNavigation from './BottomTabNavigation';


const DrawerNavigation = () => {
  return (
    // <NavigationContainer>
      <Drawer.Navigator initialRouteName="BottomTabNavigation">
        <Drawer.Screen
          name="BottomTabNavigation"
          component={BottomTabNavigation}
        />
      </Drawer.Navigator>
    // </NavigationContainer>
  );
}

export default DrawerNavigation