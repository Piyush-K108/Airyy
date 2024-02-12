import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
import BikeDetails from '../Screens/Booking/BikeDetails';
import Book from '../Screens/Booking/Book';
import Bikes from '../Screens/Booking/Bikes';
import Schedule from '../Screens/Schedule';
import Offers from '../Screens/Offers';
import FutureBook from '../Screens/Booking/FutureBook';
import Home from '../Screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Stack = createNativeStackNavigator();
  const CustomHeader = ({navigation}) => (
    <View className="bg-yellow-50">
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex flex-row justify-evenly items-left ml-9 mt-8 w-20 rounded-full  bg-gray-100 w- py-2   px-2"
        style={{elevation: 3}}>
        <Ionicons name="arrow-back-outline" size={20} className="font-bold" />
        <Text className="text-center text-black font-extrabold">Back</Text>
      </TouchableOpacity>
    </View>
  );

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
        name="Home"
        component={Home}
      />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen
        name="Bill"
        component={Bill}
        options={{
          headerShown: true,
          headerTitle: 'Bill',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen
        name="Rateus"
        component={Rateus}
        options={{
          headerShown: true,
          headerTitle: 'Rate US',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="LeftModel"
        component={LeftModel}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <CustomHeader navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="BikeDetails"
        component={BikeDetails}
        options={{
          headerShown: true,
          headerTitle: 'Details',
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen name="EditDateOfBirth" component={EditDateOfBirth} />
      <Stack.Screen name="FutureBook" component={FutureBook} />
      <Stack.Screen name="Book" component={Book} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Bikes" component={Bikes} />
      <Stack.Screen name="Offers" component={Offers} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="EditEmail" component={EditEmail} />
      <Stack.Screen name="EditGender" component={EditGender} />
      <Stack.Screen name="EditName" component={EditName} />
    </Stack.Navigator>
  );
};

export default Navigation;
