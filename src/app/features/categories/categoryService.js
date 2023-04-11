import axios from "axios";
import { tokenConfig } from "../../../utils/tokenConfig";
import { baseURL } from "../../../utils/baseURL";

const getAllCategories = async () => {
  const response = await axios.get(`${baseURL}category/`);
  return response.data;
};

const createCategory = async (categoryData) => {
  const response = await axios.post(
    `${baseURL}category/`,
    categoryData,
    tokenConfig
  );
  return response.data;
};

const deleteCategory = async (id) => {
  const response = await axios.delete(`${baseURL}category/${id}`, tokenConfig);
  return response.data;
};

export const categoryService = {
  getAllCategories,
  createCategory,
  deleteCategory,
};
