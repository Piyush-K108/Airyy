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
  const currentYear = new Date().getFullYear();
  return (
    <View className="h-screen flex flex-col">
      <View className="h-52 w-screen bg-slate-600 rounded-b-[50px] absolute z-[100]"></View>

      <View className="h-screen  flex flex-col bg-slate-500 relative top-34   px-4 z-10">
        <View className="mt-60 w-90  bg-slate-200 border-[4px] border-white shadow-black shadow-inner  mb-14">
          <View className="mt-6">
            <ButtonArrow
              name={'Profile'}
              icon="person"
              iconname={'ion'}
              screen={'UserProfile'}
            />
            <ButtonArrow name={'Rate Us'} icon="star-rate" screen={'Rateus'} />
          </View>
        </View>
        <View>
          <ButtonArrow
            name={'Ride History'}
            icon="history"
            screen={'History'}
          />
          <ButtonArrow name={'Book Bikes'} icon="motorcycle" screen={'Bikes'} />
          <ButtonArrow
            name={'Scheduled Bikes'}
            icon="event-note"
            screen={'Schedule'}
          />
          <ButtonArrow name={'Offers'} icon="local-offer" screen={'Offers'} />
          <ButtonArrow
            name={'User Agreement'}
            icon="handshake"
            screen={'Offers'}
          />
          <ButtonArrow name={'Logout'} icon="logout" />
        </View>
        <View className="items-center -mb-44">
        <Text className="text-[#121212] ">
          <Text className="text-yellow-500">&copy;</Text> {currentYear}{' '}
          Airyyrides.com
        </Text>
      </View>
      </View>

      
    </View>
  );
};

export default LeftModel;
