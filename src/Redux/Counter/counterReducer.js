import { BIKE_TYPE, LOGIN} from "./counterActionTypes";

const initialState = {
  loggedIn: false,

};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload // Update loggedIn based on the payload value
      };
    

    default:
      return state;
  }
};

export default counterReducer;
