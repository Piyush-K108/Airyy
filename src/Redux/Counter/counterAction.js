import axios from 'axios';
import {LOGIN, PHONE, BIKES, PROFILE, LOGOUT, LOCATION,SET_MAP_HTML} from './counterActionTypes';
import {DOMAIN} from '@env';
import GetLocation from '../../Components/GetLocation';
export const login = () => {
  return {
    type: LOGIN,
    payload: true,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const phone = Phone => {
  return {
    type: PHONE,
    payload: Phone,
  };
};

export const setMapHTML = (html) => ({
  type: SET_MAP_HTML,
  payload: html,
});

export const fetchBikes = () => {
  return async dispatch => {
    try {
      const result = await axios.get(`https://${DOMAIN}/Admin/bike-data/`);
      
      dispatch({
        type: BIKES,
        payload: result.data,
      });
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };
};

export const fetchProfile = phone => {
  return async dispatch => {
    try {
      const result = await axios.get(
        `https://${DOMAIN}/User/Profile/${phone}/`,
      );
      dispatch({
        type: PROFILE,
        payload: result.data.data,
      });
    } catch (error) {
      // Handle error, e.g., dispatch an action to indicate the failure
      console.error('Error fetching profile data:', error);
    }
  };
};

export const fetchLocation = () => {
  return async dispatch => {
    try {
      const currentLocation = await GetLocation();
      dispatch({
        type: LOCATION,
        payload: currentLocation,
      });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };
};
