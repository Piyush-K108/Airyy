import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import { useSelector } from 'react-redux';
import {DOMAIN} from "@env" 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FutureBook = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date()); 
  const route = useRoute();
  const navigation = useNavigation()
  const phone = useSelector(state => state.counter.phone);
  const { bid } = route.params;
  const handleSave = async () => {
    const formattedDate = formatDate(selectedDate);
    const formattedTime = formatTime(selectedTime);
  
    const data = { DateAndTime: `${formattedDate} ${formattedTime}`,bid:bid };
    console.log(data);
  
    const response = await axios.post(
      `https://${DOMAIN}/User/Schedule/${phone}/`,
      data,
    );
    console.log(response.data);
    navigation.navigate("Schedule")
  };
  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };
  
  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };
  
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFF', height: windowHeight }}>
      <View style={styles.titleCotainer}></View>
      <View style={styles.container}>
        <Text style={styles.title}>Select Date and Time</Text>

        <View className='w-[100%]'>
          <View style={styles.form}>
            <View style={styles.DatePickerContainer}>
              <Text style={styles.label}>Select Date</Text>
              <DatePicker
               className='flex w-screen items-start'
                mode="date"
                date={selectedDate}
                onDateChange={setSelectedDate}
                androidVariant="nativeAndroid"
                textColor="#000"
              />
            </View>

            <View style={styles.DatePickerContainer}>
              <Text style={styles.label}>Select Time</Text>
              <DatePicker
              className='flex w-screen items-start'
                mode="time"
                date={selectedTime}
                onDateChange={setSelectedTime}
                androidVariant="nativeAndroid"
                textColor="#000"
              />
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
              <Text style={styles.submitButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  DatePickerContainer: {
    marginBottom: windowWidth * 0.04,
  },
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
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    // height: windowHeight,
    // padding:10 ,
    paddingVertical: 0,
    marginHorizontal:10,
    // borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    borderRadius: 5,
  },

  titleCotainer: {
    backgroundColor: '#feb101',
    width: windowWidth,
    height: windowHeight * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    marginBottom: 50,
  },
  title: {
    fontSize: windowWidth * 0.04,
    backgroundColor: '#333',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: windowWidth * 0.07,
    // color: '#feb101',
    color: '#FFF',

    paddingVertical: 15,
    paddingHorizontal: 45,
    borderRadius: 14,
    fontSize: 15,
    // borderTopLeftRadius: 50,
    // borderBottomRightRadius: 50,
  },

  form: {
    marginTop: windowWidth * 0.04,
  },
  inputContainer: {
    marginBottom: windowWidth * 0.04,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: windowWidth * 0.02,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    fontWeight: 'bold',
  },

  submitButton: {
    backgroundColor: '#333',
    padding: windowWidth * 0.03,
    borderRadius: windowWidth * 0.04,
    alignItems: 'center',
    marginTop: windowWidth * 0.1,
  },
  submitButtonText: {
    color: '#feb101',
    fontWeight: '800',
    letterSpacing: 2,
  },
});

export default FutureBook;
