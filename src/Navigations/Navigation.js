import React from 'react';
import {useSelector} from 'react-redux'; // Import the useSelector hook
import BottomTabNavigation from './BottomTabNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import OtpScreen from '../Screens/OtpScreen';
import Edit_Email from '../Screens/Profile/Edit_Email';
import EditAddress from '../Screens/EditAddress';
import EditDateOfBirth from '../Screens/EditDateOfBirth';
import EditEmail from '../Screens/EditEmail';
import EditGender from '../Screens/EditGender';
import EditName from '../Screens/EditName';
import UserProfile from '../Screens/UserProfile';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  // Access the UID value from the Redux store using useSelector

  const loggedIn = useSelector(state => state.counter.loggedIn);
  const phone = useSelector(state => state.counter.phone);
console.log(loggedIn,"dsaj",phone)
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {loggedIn ? (
          <>
            <Stack.Screen
              name="BottomTabNavigation"
              component={BottomTabNavigation}
            />


            <Stack.Screen name="OtpScreen" component={OtpScreen} />

            <Stack.Screen name="EditAddress" component={EditAddress} />
            <Stack.Screen name="EditDateOfBirth" component={EditDateOfBirth} />
            <Stack.Screen name="EditEmail" component={EditEmail} />

            <Stack.Screen name="EditGender" component={EditGender} />
            <Stack.Screen name="EditName" component={EditName} />
            <Stack.Screen name="Edit_Email" component={Edit_Email} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
