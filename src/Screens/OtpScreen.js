import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {DOMAIN} from "@env"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Counter/counterAction';

const OtpScreen = () => {
  const [otp, setOtp] = useState('');
  const uid = useSelector((state) => state.counter.uid);
  const dispatch = useDispatch()
  const otpTextInputRefs = useRef([]);
 const navigation = useNavigation()
  const handleOtpChange = (index, text) => {
    // Update the OTP value at the specified index
    const updatedOtp = otp.split('');
    updatedOtp[index] = text;
    setOtp(updatedOtp.join(''));

    // Focus on the next OTP input field
    if (text.length > 0 && index < otpTextInputRefs.current.length - 1) {
      otpTextInputRefs.current[index + 1].focus();
    }
  };
  
  const handleSubmitOtp = async() => {
    console.log(uid)
    try {
      const response = await fetch(`https://${DOMAIN}/accounts/verify_otp/${uid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: otp }), 
      });
      if (response.ok) {   
        dispatch(logout(true))
       navigation.navigate("BottomTabNavigation")
      }

      else {
        // Handle error response
        console.log(response.json)
        console.error('Failed to verify OTP');
      }
    } catch (error) {
      // Handle fetch error
    
      console.error('Error Verifying OTP:', error);
    }
    
  };

  const renderOtpBoxes = () => {
    const boxes = [];
    for (let i = 0; i < 6; i++) {
      const isActive = otp.length === i;
      boxes.push(
        <TextInput
          key={i}
          ref={ref => (otpTextInputRefs.current[i] = ref)}
          style={[styles.otpBox, isActive && styles.activeOtpBox]}
          value={otp[i]}
          onChangeText={text => handleOtpChange(i, text)}
          keyboardType="numeric"
          maxLength={1}
          selectionColor="#FF5E0E"
          autoFocus={i === 0} // Automatically focus on the first OTP input field
        />,
      );
    }
    return boxes;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Screen</Text>
      <Text style={styles.subtitle}>Enter the OTP:</Text>
      <View style={styles.otpContainer}>{renderOtpBoxes()}</View>
      <TouchableOpacity style={styles.button} onPress={handleSubmitOtp}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  otpBox: {
    width: 40,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  activeOtpBox: {
    borderColor: '#FF5E0E',
  },
  button: {
    backgroundColor: '#FF5E0E',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
});

export default OtpScreen;
