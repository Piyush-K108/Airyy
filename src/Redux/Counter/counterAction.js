import { LOGIN,PHONE } from "./counterActionTypes";

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

export const phone = (Phone)=>{
  return{
    type:PHONE,
    payload:Phone
  }
}
