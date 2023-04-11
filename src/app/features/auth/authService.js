import axios from "axios";
import { baseURL } from "../../../utils/baseURL";

const login = async (user) => {
  const response = await axios.post(`${baseURL}user/login-admin`, user);

  if (response.data) {
    //save user state to the local storage
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

export const authService = { login };
