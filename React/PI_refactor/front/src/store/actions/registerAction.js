import axios from "axios";
const localURL = "http://localhost/register";
export const registerUser = async () => {
  let data = {
    user_id: "front",
    user_password: 3456,
  };
  const registerAction = await axios.post(localURL, data).then(
    res => dispatch({type: "REQUEST_SUCCEEDED" , payload: response}),
    error => dispatch({type: "REQUEST_FAILED", error: error})
  );
};
