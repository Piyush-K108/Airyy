import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/core';

const BikeDetails = () => {
  const route = useRoute();
  const {selectedBike} = route.params;
  const navigation = useNavigation();
  
  return (
    <>
      <View className="justify-center items-center bg-white h-[600px]">
        <Image
          resizeMode="cover"
          source={{uri: selectedBike.Image}}
          className="w-72 h-72 "
        />
        <Text className="text-black mb-40">Coming Soon the 3d Image</Text>
      </View>

      <View className="border-x-[4px] z-[100] border-t-[4px] border-b-[1px] rounded-t-[40px] h-screen bottom-40 w-screen  border-yellow-200">
        <View className="w-screen flex-row justify-between mb-2">
          <View>
            <Text className="text-black text-2xl px-8 py-2">
              {selectedBike.b_id}
            </Text>
            <Text className="text-black font-extralight text-[18px] px-8 ">
              {selectedBike.license_plate}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FutureBook', {bid: selectedBike.b_id});
            }}
            className="bg-black flex items-center justify-center w-20 h-10 mx-10 mt-6 shadow-2xl rounded-lg ">
            <Text className="text-yellow-400 font-bold">Book</Text>
          </TouchableOpacity>
        </View>

        <View className="flex justify-evenly  gap-4 p-4  flex-row">
          <View className="bg-yellow-200 w-24 h-10 flex rounded-[15px] items-center justify-center shadow-md">
            <Text className="text-black font-bold">
              {selectedBike.KM_Now}-KM
            </Text>
          </View>

          <View className="bg-yellow-200 w-24 h-10 flex rounded-[15px] items-center justify-center">
            <Text className="text-black font-bold">BLDC Model</Text>
          </View>
          <View className="bg-yellow-200 w-24 h-10 flex rounded-[15px] items-center justify-center">
            <Text className="text-black font-bold">65km range</Text>
          </View>
        </View>
        <View className="text-black bg-white flex-1  px-8 py-2">
          <Text className="text-xl text-black mb-2">Description</Text>
          <Text className="text-[14px] text-justify leading-5 text-black font-light">
            {selectedBike.Electrical
              ? 'The Jiva Stream E-scooter seamlessly combines a lightweight design with cutting-edge technology, offering a stylish appearance, comfortable urban and long-distance rides with advanced features.'
              : 'The Honda Activa 6G, boasts a 109.51cc BS6 engine, modern features like telescopic forks, and keyless Smart Key variant, offering excellent reliability, fuel efficiency, and a stylish design.'}
          </Text>
        </View>
      </View>
    </>
  );
};

export default BikeDetails;
