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
  const [isLeftDrawer, setIsLeftDrawer] = useState(false);
  const phone = useSelector(state => state.counter.phone);
  const [data, setData] = useState([]);

  const handLeftDrawer = () => {
    setIsLeftDrawer(!isLeftDrawer);
  };

  const fetchData = async () => {
    const result = await axios.get(`https://${DOMAIN}/User/Profile/${phone}/`);
    setData(result.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      
      <View className="py-8 px-5  flex flex-row justify-between">
        <TouchableOpacity
          onPress={()=>navigation.navigate('LeftModel')}>
          <View className="mt-3 flex-row   overflow-hidden rounded-full">
            <MaterialIcons
              name='menu'
              size={32}
              color="#666"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
          <View className="rounded-full overflow-hidden">
            <Image
              resizeMode="cover"
              source={data.ProfilePic ? {uri: data.ProfilePic} : user}
              className="w-14 h-14"
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Header;
