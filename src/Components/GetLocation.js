// GetLocation.js

import { PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const getLocation = async () => {
  try {
    const granted = await requestLocationPermission();
    if (granted) {
      const position = await getCurrentPosition();
      return position;
    } else {
      console.log('Location permission denied');
      return null;
    }
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error requesting location permission:', err);
    return false;
  }
};

const getCurrentPosition = () =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  });

export default getLocation;
