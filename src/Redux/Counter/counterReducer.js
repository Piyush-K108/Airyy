import { LOGIN ,PHONE} from "./counterActionTypes";

const initialState = {
  loggedIn: false,
  phone:''
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case PHONE:
      return{
        ...state,
        phone: action.payload,
      }
    default:
      return state;
  }
};

export default counterReducer;