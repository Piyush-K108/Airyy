// ProfileEdit.js
import { useEffect } from 'react';
import axios from 'axios';
import { DOMAIN } from '@env';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchProfile } from '../../Redux/Counter/counterAction';

export const ProfileEdit = () => {
  const navigation = useNavigation();
  const phone = useSelector((state) => state.counter.phone);
  const dispatch = useDispatch();

  const editProfile = async (data, contentType) => {
    try {
      let config;

      if (contentType === 'multipart/form-data') {
        config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };
      }
      
      const response = await axios.put(
        `https://${DOMAIN}/User/Profile/${phone}/`,
        data,
        config
      );

      dispatch(fetchProfile(phone));
      navigation.navigate('UserProfile');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return editProfile;
};
