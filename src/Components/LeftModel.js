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
const windowHeight = Dimensions.get('window').height;

const LeftModel = () => {
  return (
    <View className="h-screen absolute bg-slate-300 w-screen z-10">
      <Text className='text-black'>Profile</Text>
    </View>
  );
};

export default LeftModel;
