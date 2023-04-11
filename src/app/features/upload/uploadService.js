import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { tokenConfig } from "../../../utils/tokenConfig";

const uploadImage = async (data) => {
  const response = await axios.post(`${baseURL}upload/`, data, tokenConfig);
  return response.data;
};

const deleteImage = async (id) => {
  const response = await axios.delete(
    `${baseURL}upload/delete-img/${id}`,
    tokenConfig
  );
  return response.data;
};

export const uploadService = { uploadImage, deleteImage };
