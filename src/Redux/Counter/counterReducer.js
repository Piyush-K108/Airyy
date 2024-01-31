import { LOGIN, PHONE, BIKES,PROFILE } from './counterActionTypes';

const initialState = {
  loggedIn: false,
  phone: '',
  bikes: [],
  profile: [],
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload,
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
    default:
      return state;
  }
};

export default counterReducer;