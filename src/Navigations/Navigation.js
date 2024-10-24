import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
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
import LeftModel from '../Components/LeftModel';
import History from '../Screens/History';
import BikeDetails from '../Screens/Booking/BikeDetails';
import Book from '../Screens/Booking/Book';
import Bikes from '../Screens/Booking/Bikes';
import Schedule from '../Screens/Schedule';
import Offers from '../Screens/Offers';
import FutureBook from '../Screens/Booking/FutureBook';
import mapTemplate from '../Components/mapTemplate';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useDispatch} from 'react-redux';
import {
  fetchBikes,
  fetchLocation,
  fetchProfile,
  setMapHTML
} from '../Redux/Counter/counterAction';
import Home from '../Screens/Home';
import Home2 from '../Screens/Home2';
import EditCity from '../Screens/Profile/EditCity';
import AgreementPage from '../Screens/AgreementPage';
// import StationLocation from '../Screens/StationLocation';
import StationLocation from '../Screens/StationLocation';

const Stack = createNativeStackNavigator();
const CustomHeader = ({navigation, title, yellow = true}) => (
  <View className={yellow ? 'bg-yellow-200' : 'bg-white'}>
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="flex flex-row justify-evenly items-left ml-4 mt-4 -mb-8 w-20 rounded-full   bg-gray-50  py-2  "
      style={{elevation: 2}}>
      <Ionicons
        name="arrow-back-outline"
        style={{color: 'black'}}
        size={22}
        className="font-bold"
      />
      <Text className="text-center text-[#121212] font-extrabold">{title}</Text>
    </TouchableOpacity>
  </View>
);

const Navigation = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(state => state.counter.loggedIn);
  const phone = useSelector(state => state.counter.phone);
  const profile = useSelector(state => state.counter.profile);
  const location = useSelector(state => state.counter.location);
  
  if (!profile) {
    dispatch(fetchProfile(phone));
  }
  useEffect(() => {
    dispatch(setMapHTML(mapTemplate));
    dispatch(fetchLocation());
    dispatch(fetchBikes());
    
    console.log(location);
  }, []);

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
      <Stack.Screen name="Bottom" component={BottomTabNavigation} />
      <Stack.Screen name="Home" component={Home} />

      <Stack.Screen name="Home2" component={Home2} />
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
        name="LeftModel"
        component={LeftModel}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <CustomHeader navigation={navigation} title="Back" />,
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
      <Stack.Screen name="EditCity" component={EditCity} />
      <Stack.Screen name="AgreementPage" component={AgreementPage} />
      <Stack.Screen
        name="StationLocation"
        component={StationLocation}
        options={({navigation}) => ({
          headerShown: true,
          header: () => <CustomHeader navigation={navigation} title="Back"  yellow={false}/>,
        })}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
