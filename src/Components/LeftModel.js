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
import {ScrollView} from 'react-native-gesture-handler';
const windowHeight = Dimensions.get('window').height;

const LeftModel = () => {
  return (
    <ScrollView>
      <View className="h-screen absolute bg-slate-300 w-60 z-10">

        

      </View>
    </ScrollView>
  );
};

export default LeftModel;
