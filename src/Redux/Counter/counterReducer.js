import { LOGIN } from "./counterActionTypes";

const initialState = {
  loggedIn: false,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload,
      };

    default:
      return state;
  }
};

export default counterReducer;