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

const LeftModel = () => {
  return (
    <View className="h-screen absolute flex flex-col bg-slate-100   px-4 z-10">
      <View className="mt-10 w-90  bg-slate-200 shadow-xl  mb-14">
        <View className="mt-4">
          <ButtonArrow name={'Profile'} icon="person" iconname={'ion'} screen={'UserProfile'} />
          <ButtonArrow name={'Rate Us'} icon="star-rate" screen={'Rateus'} />
        </View>
      </View>
      <View>
        <ButtonArrow name={'Ride History'} icon="history" screen={'History'} />
        <ButtonArrow name={'Book Bikes'} icon="motorcycle" screen={'Bikes'} />
        <ButtonArrow name={'Scheduled Bikes'} icon="event-note" screen={'Schedule'} />
        <ButtonArrow name={'Offers'} icon="local-offer" screen={'Offers'} />
        <ButtonArrow name={'User Agreement'} icon='local-offer' screen={'Offers'} />
        <ButtonArrow name={'Logout'} icon='local-offer' />
      </View>
    </View>
  );
};

export default LeftModel;
