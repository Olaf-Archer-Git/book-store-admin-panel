import axios from "axios";
import { tokenConfig } from "../../../utils/tokenConfig";
import { baseURL } from "../../../utils/baseURL";

const getOrders = async () => {
  const response = await axios.get(`${baseURL}order/all-orders`, tokenConfig);
  return response.data;
};

// const createOrder = async (id) => {
//   const response = await axios.post(
//     `${baseURL}order/orderById/${id}`,
//     "",
//     tokenConfig
//   );
//   return response.data;
// };

export const orderService = { getOrders };
