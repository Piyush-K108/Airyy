import { LOGIN } from "./counterActionTypes";

export const login = () => {
   return {
     type: LOGIN,
     payload:true
   };
 };

export const logout = () => {
  return {
    type: LOGIN,
    payload: false
  };
};


