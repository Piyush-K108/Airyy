import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Screens/Home";
import UserProfile from "../Screens/UserProfile";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const Tab = createBottomTabNavigator();

function BottomTabNavigation() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
          
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home'
               
            } else if (route.name === 'UserProfile') {
              iconName = 'person'
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown:false ,
          
        })}
      >
            
            <Tab.Screen name="Home" component={Home} options = {{tabBarLabel : "Home"}}  />
            <Tab.Screen name="UserProfile" component={UserProfile} options = {{tabBarLabel : "UserProfile"}} />
        </Tab.Navigator>
    )


}

export default BottomTabNavigation ;