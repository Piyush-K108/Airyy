import React from 'react';
import {useSelector} from 'react-redux';
import BottomTabNavigation from './BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import OtpScreen from '../Screens/OtpScreen';
import EditGender from '../Screens/Profile/EditGender';
import EditDateOfBirth from '../Screens/Profile/EditDateOfBirth';
import EditEmail from '../Screens/Profile/EditEmail';
import EditName from '../Screens/Profile/EditName';
import UserProfile from '../Screens/Profile/UserProfile';
import Bill from '../Screens/Bill';
import Rateus from '../Screens/Rateus';
import LeftModel from '../Components/LeftModel';
import History from '../Screens/History';
import BikeDetails from '../Screens/BikeDetails';
import Book from '../Screens/Book';
import Bikes from '../Screens/Bikes';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const loggedIn = useSelector(state => state.counter.loggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loggedIn ? (
          <>
            <Stack.Screen name="Main" component={MainStack} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="BottomTabNavigation"
        component={BottomTabNavigation}
      />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Bill" component={Bill}  options={{
          headerShown: true,
          headerTitle: 'Bill',
          headerStyle: {
            backgroundColor: '#feb101', 
          },
        }} />
      <Stack.Screen name="UserProfile" component={UserProfile}  />
      <Stack.Screen
        name="Rateus"
        component={Rateus}
        options={{
          headerShown: true,
          headerTitle: 'Rate US',
          headerStyle: {
            backgroundColor: '#feb101', 
          },
        }}
      />
      <Stack.Screen
        name="LeftModel"
        component={LeftModel}
        options={{
          headerShown: true,
          headerTitle: 'Menu',
          headerStyle: {
            backgroundColor: '#feb101', 
          },
        }}
      />
      <Stack.Screen
        name="BikeDetails"
        component={BikeDetails}
        options={{
          headerShown: true,
          headerTitle: 'Details',
          headerStyle: {
            backgroundColor: '#feb101', 
          },
        }}
      />
      <Stack.Screen name="EditDateOfBirth" component={EditDateOfBirth} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Bikes" component={Bikes} />
      <Stack.Screen name="EditEmail" component={EditEmail} />
      <Stack.Screen name="EditGender" component={EditGender} />
      <Stack.Screen name="EditName" component={EditName} />
    </Stack.Navigator>
  );
};

export default Navigation;
