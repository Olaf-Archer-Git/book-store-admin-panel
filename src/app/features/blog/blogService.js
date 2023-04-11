import axios from "axios";
import { baseURL } from "../../../utils/baseURL";
import { tokenConfig } from "../../../utils/tokenConfig";

const getBlogs = async () => {
  const response = await axios.get(`${baseURL}blog/`);

  return response.data;
};

const createBlog = async (blog) => {
  const response = await axios.post(`${baseURL}blog/`, blog, tokenConfig);

  return response.data;
};

const updateBlog = async (blog) => {
  const response = await axios.update(
    `${baseURL}blog/${blog.id}`,
    {
      title: blog.data.title,
      description: blog.data.description,
    },
    tokenConfig
  );

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseURL}blog/${id}`, tokenConfig);

  return response.data;
};

export const blogService = { getBlogs, createBlog, updateBlog, deleteBlog };
