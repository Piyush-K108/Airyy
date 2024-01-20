import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
  Image,
} from 'react-native';
import MuiIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';



import {useDispatch} from 'react-redux';
import {logout} from '../Redux/Counter/counterAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Screens/Home';
import BottomTabNavigation from './BottomTabNavigation';





const DrawerContent = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);

    // Perform the logout functionality here
    dispatch(logout(false));

    // Simulating logout delay
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Login');
      BackHandler.exitApp();
    }, 3000);
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image
          source={require('../assets/Logos/Final Logo PNG.png')} // Replace with your logo path
          style={styles.logo}
        />
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#000"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}

        <View style={styles.copyrightContainer}>
          <Text style={styles.copyrightText}>© 2024 Airry Rides</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    
    <Drawer.Navigator  
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        headerStyle: {backgroundColor: '#feb101'},
        headerTintColor: '#000000',
        drawerLabelStyle: {
          fontWeight: 'bold',
          color: '#000',
          textAlign: 'center',
        },
        drawerActiveTintColor: '#feb101',
        headerTitleStyle: {fontWeight: 'bold'},
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: 'Home',
          title: '',
          drawerIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? '#feb101' : '#000000'}
            />
          ),
          drawerItemStyle: {textAlign: 'left'}, 
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  container: {
    flex: 1,
    paddingTop: 20, // Add margin from the top
    paddingHorizontal: 16, // Add horizontal padding
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#feb101',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutIcon: {
    marginLeft: 10,
    color: '#000', // Add space between icon and text
  },
  logoutButtonText: {
    color: '#000000',
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 80,
  },
  copyrightContainer: {
    position: 'relative',
    marginTop: 280,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  copyrightText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
});

export default DrawerNavigation;
