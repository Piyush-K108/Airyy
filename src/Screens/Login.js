import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  StatusBar,
} from 'react-native';
import BottomTabNavigator from '../Navigations/BottomTabNavigation';
import React from 'react';
import {useState} from 'react';
import {DOMAIN} from '@env';
import {useDispatch} from 'react-redux';
import {login} from '../Redux/Counter/counterAction';
import Icon from 'react-native-vector-icons/FontAwesome';

import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';
const Login = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [number, onChangeNumber] = React.useState('');
  const [countryCode, onChangeCountryCode] = React.useState('+91');
  const navigation = useNavigation();
  const data = JSON.stringify({phone: number});
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.counter.loggedIn);

  const handleGetOtp = async () => {
    try {
      const response = await fetch(`https://${DOMAIN}/accounts/create_user/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      if (response.ok) {
        const data1 = await response.json();
        const uid = data1.uid;
        
        dispatch(login());
     
      } else {
        console.error('Failed to fetch OTP', response);
      }
    } catch (error) {
      // Handle fetch error

      console.error('Error fetching OTP:', error);
    }
  };
  React.useEffect(() => {
    console.log(loggedIn);
  }, [loggedIn]);
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <View style={styles.boxContainer}>
        <View style={styles.box}>
          <Image
            source={require('../assets/BikeIMG.jpg')}
            style={styles.image}
          />

          <Text style={styles.text}>Welcome to AiRYY !</Text>
          <Text style={styles.subText}>
            We make traveling simple and smoother .
          </Text>
        </View>
        <Text style={styles.adventureText}>
          Your Bike Adventure Begins Here!
        </Text>
        <View style={styles.loginSignupContainer}>
          <Text style={styles.loginSignupText}>Login or Signup</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCodeText}>{countryCode}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            onChangeText={onChangeNumber}
            value={number}
            keyboardType="numeric"
          />
        </View>

        {/* code for button  */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleGetOtp}>
          <Text style={styles.buttonText}>GET OTP</Text>
        </TouchableOpacity>

        {/* code for check box  */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, isChecked && styles.checked]}
            onPress={toggleCheckbox}>
            {isChecked && <Icon name="check" color="#000" size={18} />}
          </TouchableOpacity>
          <Text style={styles.checkboxText}>Get updates on calls/WhatsApp</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    flex: -1,
    justifyContent: 'center',
    // backgroundColor: '#FF5E0E',
    backgroundColor: '#ff553e',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center',

    width: Dimensions.get('window').width * 1.0, // Adjust the width as per your requirement
    height: 350,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2.25,
    shadowRadius: 4,
    elevation: 20,
  },

  boxContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    // marginHorizontal: Dimensions.get('window').width * 0.08,
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },

  image: {
    width: 380,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
    marginTop: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomWidth: 2,
    // borderBottomColor: '#FF8C00',
  },

  adventureText: {
    fontSize: 18,
    color: 'black',
    marginTop: 15,
    marginBottom: 50,
    fontWeight: '600',
    padding: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    // elevation:10 ,
    borderRadius: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    marginTop: 20,
    width: '85%', // Adjust the width as per your requirement
    maxWidth: 350, // Optional: Set a maximum width if needed
    justifyContent: 'center', // Optional: Adjust the content alignment
    backgroundColor: 'white', // Set the background color to white
    shadowColor: '#000', // Box shadow color
    shadowOffset: {width: 0, height: 2}, // Box shadow offset
    shadowOpacity: 0.2, // Box shadow opacity
    shadowRadius: 2, // Box shadow radius
    elevation: 2, // Box shadow elevation for Android
    height: 60, // Adjust the height as per your requirement
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'black',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    paddingVertical: 8,
  },
  loginSignupContainer: {
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 0,
  },

  loginSignupText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonContainer: {
    // backgroundColor: '#ffe550',
    backgroundColor: '#ffdd4b',

    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    width: '83%', // Adjust the width as per your requirement
    maxWidth: 390,
  },

  buttonText: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },

  //Check box container styles

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ffdd4b',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#ffdd4b',
    borderColor: '#ffdd4b',
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
  },
});

export default Login;
