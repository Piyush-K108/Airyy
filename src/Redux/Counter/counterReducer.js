import {
  LOGIN,
  PHONE,
  BIKES,
  PROFILE,
  LOGOUT,
  LOCATION,
  SET_MAP_HTML,
} from './counterActionTypes';

const initialState = {
  loggedIn: false,
  phone: '',
  bikes: [],
  profile: [],
  location: [],
  mapHTML: null,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState,
      };
    case PHONE:
      return {
        ...state,
        phone: action.payload,
      };
    case PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case BIKES:
      return {
        ...state,
        bikes: action.payload,
      };
    case LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case SET_MAP_HTML:
      return {
        ...state,
        mapHTML: action.payload,
      };
    default:
      return state;
  }
};

export default counterReducer;
