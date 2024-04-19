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
  ScrollView,
  
} from 'react-native';
import ButtonArrow from './ButtonArrow';
import LinearGradient from 'react-native-linear-gradient';
// import {useDispatch} from 'react-redux';
// import {fetchProfile, logout} from '../../Redux/Counter/counterAction';
// import {useSelector} from 'react-redux';
const LeftModel = () => {
  const currentYear = new Date().getFullYear();
 
  return (
    <ScrollView>
      <View className="h-screen flex flex-col">
        {/* <View className="h-52 w-screen bg-slate-600 rounded-b-[50px] absolute z-[100]"></View> */}

        <View className="h-screen flex flex-col  items-center  bg-gray-50">
          <LinearGradient
            colors={['#fef08a', '#f9fafb']}
            className="flex justify-center items-center  w-[100%]" // You can change these colors as per your gradient
          >
            <View
              className="mt-16 w-[90%] px-4  bg-white  rounded-lg  mb-10"
              style={styles.cardContainer}>
              <View className="mt-6 ">
                <ButtonArrow
                  name={'Profile'}
                  icon="person"
                  iconname={'ion'}
                  screen={'UserProfile'}
                  showProfilePic={true}
                />

                <ButtonArrow
                  name={'None'}
                  icon="star-rate"
                  screen={'None'}
                />
              </View>
            </View>
          </LinearGradient>
          <View
            className="bg-gray-50 mt-4  ml-4 mr-4 w-[90%] py-8 rounded-lg"
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
              screen={'AgreementPage'}
            />
            <ButtonArrow name={'Logout'} icon="logout" />
          </View>
          <View className="items-center mt-10 bg-black py-2 px-4 rounded-lg w-80 ">
            <Text className="text-yellow-500">
              <Text className="text-yellow-500">&copy;</Text> {currentYear}{' '}
              airyyrides.com
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({

});

export default LeftModel;