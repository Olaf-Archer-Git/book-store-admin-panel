import axios from "axios";
import { tokenConfig } from "../../../utils/tokenConfig";
import { baseURL } from "../../../utils/baseURL";

const createDiscount = async (discountData) => {
  const response = await axios.post(
    `${baseURL}discount`,
    discountData,
    tokenConfig
  );

  return response.data;
};

const deleteDiscount = async (id) => {
  const response = axios.delete(`${baseURL}discount/${id}`, tokenConfig);

  return response.data;
};

export const discountService = { createDiscount, deleteDiscount };
