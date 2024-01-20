// ProfileEdit.js
import { useEffect } from 'react';
import axios from 'axios';
import { DOMAIN } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
export const ProfileEdit = () => {
  const navigation = useNavigation();
  const phone = useSelector(state => state.counter.phone);

  const editProfile = async (data) => {
    try {
      console.log(data)
      const response = await axios.put(
        `https://${DOMAIN}/User/Profile/${phone}/`,
        data
      );

      console.log(response.data);
      navigation.navigate('UserProfile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return editProfile;
};
