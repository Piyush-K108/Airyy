import React from 'react';
import {Text, View, TouchableOpacity , Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import user from "../images/userProfile.png"
import {logout} from '../Redux/Counter/counterAction';
import {useDispatch} from 'react-redux';
import {fetchProfile} from '../../Redux/Counter/counterAction';
import {useSelector} from 'react-redux';
const ButtonArrow = ({name, icon, screen, iconname, showProfilePic = false ,}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

   const data = useSelector(state => state.counter.profile);
  //  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={() => {
        name === 'Logout' ? handleLogout() : navigation.navigate(screen);
      }}>
      <View className="flex flex-row w-[100%] justify-between py-1 px-4 ">
        <View className="flex-row ">
          {showProfilePic ? (
            <>
              <Image
                resizeMode="cover"
                source={data.ProfilePic ? {uri: data.ProfilePic} : user}
                className="w-6 h-6 rounded-full border"
                
              />
            </>
          ) : (
            <>
              {iconname === 'ion' ? (
                <Ionicons
                  style={{color: '#facc15'}}
                  className="text-yellow-600"
                  name={icon}
                  size={20}
                />
              ) : (
                <MaterialIcons
                  style={{color: name !== 'Logout' ? '#facc15' : 'red'}}
                  className="text-[#121212]"
                  name={icon}
                  size={20}
                />
              )}
            </>
          )}
          <Text className="text-[#121212] font-bold px-2">{name}</Text>
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
