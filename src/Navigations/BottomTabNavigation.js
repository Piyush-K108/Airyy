import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image } from "react-native";
import Home from "../Screens/Home";
import Bikes from "../Screens/Booking/Bikes";
import Schedule from "../Screens/Schedule";
import Offers from "../Screens/Offers";
import History from "../Screens/History";

const Tab = createBottomTabNavigator();


function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Bikes') {
            iconName = 'motorcycle';
          } else if (route.name === 'Schedule') {
            iconName = 'event-note';
          } else if (route.name === 'History') {
            iconName = 'history';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fab319',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >

      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="Bikes" component={Bikes} options={{ tabBarLabel: "Bikes" }} />
      <Tab.Screen name="Schedule" component={Schedule} options={{ tabBarLabel: "Schedule" }} />
      <Tab.Screen name="History" component={History} options={{ tabBarLabel: "History" }} />

    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
