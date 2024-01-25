import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const ButtonArrow = ({name, icon, screen, iconname}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(screen)}>
      <View className="flex flex-row w-[100%] justify-between  px-4 ">
        <View className="flex-row ">
          {iconname === 'ion' ? (
            <Ionicons
              style={{color: '#000000c2'}}
              className="text-[#000000c2]"
              name={icon}
              size={20}
            />
          ) : (
            <MaterialIcons
              style={{color: '#000000c2'}}
              className="text-[#000000c2]"
              name={icon}
              size={20}
            />
          )}
          <Text className="text-[#000000c2] px-2">{name}</Text>
        </View>
        <Ionicons
          style={{color: '#000000c2', marginRight: 20}}
          className="text-[#000000c2]"
          name={'chevron-forward'}
          size={20}
        />
      </View>
      <View className="mb-4 border-[0.2px] mt-2" />
    </TouchableOpacity>
  );
};

export default ButtonArrow;
