import axios from "axios";
const localURL = "http://localhost/register";



export const REGISTER_DATA = 'REGISTER_DATA';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';


export const registerUser = async () => {
  let data = {
    user_id: "front",
    user_password: 3456,
  };

};


export const registerSucceeded =() => {}

export const registerFailed =() => {}