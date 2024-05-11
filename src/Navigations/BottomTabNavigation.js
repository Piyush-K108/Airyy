import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Image } from "react-native";
import Home from "../Screens/Home";
import Bikes from "../Screens/Booking/Bikes";
import Schedule from "../Screens/Schedule";
import Offers from "../Screens/Offers";
import History from "../Screens/History";
import Home2 from "../Screens/Home2";

const Tab = createBottomTabNavigator();


function BottomTabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#000',
        // tabBarInactiveTintColor: '#9695A5',
        tabBarInactiveTintColor: '#7B7E7B',

        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          // backgroundColor: '#FDFEE7' light,
          backgroundColor: '#facc15',
          // backgroundColor: '#FBFCB4',
          position: 'absolute',
          bottom: 10,
          left: 20,

          right: 20,
          elevation: 1,
          borderRadius: 30,
          height: 60,
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home2}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
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
        })}
      />
      <Tab.Screen
        name="Bikes"
        component={Bikes}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
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
        })}
      />
      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={({route}) => ({
          headerShown: false,
          tabBarIcon: ({color, size}) => {
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
        })}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={({route}) => ({
          headerShown: false,

          tabBarIcon: ({color, size}) => {
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
        })}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigation;
