import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { tokenConfig } from "../../../utils/tokenConfig";

const getQueries = async () => {
  const response = await axios.get(`${baseURL}queries/`);
  return response.data;
};

const getQuery = async (id) => {
  const response = await axios.get(`${baseURL}queries/${id}`);
  return response.data;
};

const updateQuery = async (data) => {
  const response = await axios.put(
    `${baseURL}queries/${data.id}`,
    { status: data.queryData },
    tokenConfig
  );
  return response.data;
};

const deleteQuery = async (id) => {
  const response = await axios.delete(`${baseURL}queries/${id}`, tokenConfig);
  return response.data;
};

export const queryService = { getQueries, getQuery, updateQuery, deleteQuery };
