import axios from "axios";
import { tokenConfig } from "../../../utils/tokenConfig";
import { baseURL } from "../../../utils/baseURL";

const getProducts = async () => {
  const response = await axios.get(`${baseURL}product/`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${baseURL}product/`, product, tokenConfig);
  return response.data;
};

const updateProduct = async (product) => {
  const response = await axios.put(
    `${baseURL}product/${product.id}`,
    {
      title: product.data.title,
      author: product.data.author,
      category: product.data.category,
      price: product.data.price,
    },
    tokenConfig
  );
  return response.data;
};

const deleteProduct = async (id) => {
  const response = await axios.delete(`${baseURL}product/${id}`, tokenConfig);
  return response.data;
};

export const productService = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
