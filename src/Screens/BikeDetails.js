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
import {useRoute} from '@react-navigation/core';

const BikeDetails = ({route}) => {
  const {selectedBike} = route.params;

  const handleBook = ()=>{
    console.log(selectedBike.b_id)
  }
  return (
    <>
      <View className="justify-center items-center bg-white h-[600px]">
      <Image
          resizeMode="cover"
          source={{uri: selectedBike.Image}}
          className="w-96 h-96 "
        />
        <Text className="text-black mb-40">Coming Soon the 3d Image</Text>
        
      </View>

      <View className="border-x-[4px] z-[100] border-t-[4px] border-b-[1px] rounded-t-[40px] h-screen bottom-40 w-screen  border-green-600">
        <View className="w-screen flex-row justify-between">
          <View>
            <Text className="text-black text-2xl px-8 py-2">
              {selectedBike.b_id}
            </Text>
            <Text className="text-black font-extralight text-xl px-8 ">
              {selectedBike.license_plate}
            </Text>
          </View>
          <TouchableOpacity onPress={handleBook} className="bg-blue-600 flex items-center justify-center w-20 h-10 mx-10 mt-6">
          <Text className="text-white font-bold">Book</Text>
          </TouchableOpacity>
        </View>

        <View className="w-screen flex  gap-5 pt-6 px-8  flex-row">
          <View className="bg-yellow-500 w-24 h-20 flex rounded-[24px] items-center justify-center">
            <Text className="text-white font-bold">
              {selectedBike.KM_Now}-KM
            </Text>
          </View>

          <View className="bg-yellow-500 w-24 h-20 flex rounded-[24px] items-center justify-center">
            <Text className="text-white font-bold">Model</Text>
          </View>
          <View className="bg-yellow-500 w-24 h-20 flex rounded-[24px] items-center justify-center">
            <Text className="text-white font-bold">Year</Text>
          </View>
        </View>
        <View className="text-black  px-8 py-2">
          <Text className="text-2xl text-black">Description</Text>
          <Text className="text-[14px] text-justify text-black font-light">
            Cillum dolor enim duis irure. Dolor anim ullamco nisi est non
            commodo quis irure aliquip consectetur voluptate sint et. Voluptate
            incididunt tempor qui tempor eiusmod. Veniam exercitation est ut
            proident sit magna non consequat officia.
          </Text>
        </View>
      </View>
    </>
  );
};

export default BikeDetails;
