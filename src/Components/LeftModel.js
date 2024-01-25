import {useState} from 'react';
import {
  Image,
  Modal,
  View,
  Button,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ButtonArrow from './ButtonArrow';

const windowHeight = Dimensions.get('window').height;

const LeftModel = () => {
  return (
    <View className="h-screen absolute flex flex-col bg-slate-100   px-4 z-10">
      <View className='mt-10'>
      <ButtonArrow name={'Profile'} icon="person" iconname={'ion'} screen={'UserProfile'} />
      <ButtonArrow name={'Rate Us'} icon="star-rate" screen={'Rateus'} />
      <ButtonArrow name={'Ride History'} icon="history" screen={'History'} />
      <ButtonArrow name={'Book Bikes'} icon="book" screen={'Bikes'} />
      </View>
    </View>
  );
};

export default LeftModel;
