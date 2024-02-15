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
  ScrollView ,
} from 'react-native';
import ButtonArrow from './ButtonArrow';

const LeftModel = () => {
  const currentYear = new Date().getFullYear();
  return (
    <ScrollView>
      <View className="h-screen flex flex-col">
        {/* <View className="h-52 w-screen bg-slate-600 rounded-b-[50px] absolute z-[100]"></View> */}

        <View className="h-screen flex flex-col  items-center  bg-yellow-50">
          <View
            className="mt-14 w-80  bg-white border bo  rounded-lg  mb-10"
            style={styles.cardContainer}>
            <View className="mt-6">
              <ButtonArrow
                name={'Profile'}
                icon="person"
                iconname={'ion'}
                screen={'UserProfile'}
              />
              <ButtonArrow
                name={'Rate Us'}
                icon="star-rate"
                screen={'Home2'}
              />
            </View>
          </View>
          <View
            className="bg-yellow-50 ml-4 mr-4 w-80 py-6 rounded-lg"
            style={styles.cardContainertwo}>
            <ButtonArrow
              name={'Ride History'}
              icon="history"
              screen={'History'}
            />
            <ButtonArrow
              name={'Book Bikes'}
              icon="motorcycle"
              screen={'Bikes'}
            />
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
          <View className="items-center mt-10 bg-black py-2 px-4 rounded-lg w-80 ">
            <Text className="text-yellow-500">
              <Text className="text-yellow-500">&copy;</Text> {currentYear}{' '}
              Airyyrides.com
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  
  cardContainertwo: {
 
    elevation: 1,
     // Add elevation for shadow
   
  }
});

export default LeftModel;