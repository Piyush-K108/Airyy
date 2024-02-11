import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Counter/counterAction';
const ButtonArrow = ({name, icon, screen, iconname}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const handelLogout = () => {
    dispatch(logout());
  };

  return (
    <TouchableOpacity onPress={() => {name ==='Logout'?  handelLogout():navigation.navigate(screen)}}>
      <View className="flex flex-row w-[100%] justify-between py-1 px-4 ">
        <View className="flex-row ">
          {iconname === 'ion' ? (
            <Ionicons
              style={{color: 'rgb(253 205 71)'}}
              className="text-yellow-600"
              name={icon}
              size={20}
            />
          ) : (
            <MaterialIcons
              style={{color: name!=='Logout'?'rgb(253 205 71)':"red"}}
              className="text-[#121212]"
              name={icon}
              size={20}
            />
          )}
          <Text className="text-[#121212] px-2">{name}</Text>
        </View>
        <Ionicons
          style={{color: '#121212', marginRight: 20}}
          className="text-[#121212]"
          name={'chevron-forward'}
          size={20}
        />
      </View>
      <View className="mb-4 mt-2" />
    </TouchableOpacity>
  );
};

export default ButtonArrow;
