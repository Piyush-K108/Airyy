import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity,Image, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import user from '../images/userProfile.png';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {DOMAIN} from '@env';
import LeftModel from '../Components/LeftModel';
const Header = () => {
  const navigation = useNavigation();
  const data = useSelector((state) => state.counter.profile);

  return (
    <>
      <View className="my-8 mx-5 bg-yellow-100  rounded-full   flex flex-row justify-between">
        <TouchableOpacity onPress={() => navigation.navigate('LeftModel')}>
          <View className="mt-3 flex-row  mx-2 overflow-hidden rounded-full">
            <MaterialIcons name="menu" size={32} color="#666" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <View className="rounded-full overflow-hidden shadow-lg">
            <Image
              resizeMode="cover"
              source={data.ProfilePic ? {uri: data.ProfilePic} : user}
              className="w-14 h-14 shadow-lg"
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;
