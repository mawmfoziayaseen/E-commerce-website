import axios from "axios";

// use this funcction in authslice.js =>  createAsyncThunk

const createCat = async (inputValues) => {
  try {
    const axiosRespone = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/categories`,
      inputValues,
      {
        withCredentials: true, //axios send automatically cookies when we apply this property
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespone.data;
  } catch (error) {
    const errorMessage =
      error.respone?.data?.message ||
      error.message ||
      "something went wrong please try again";
    return Promise.reject(errorMessage);
  }
};
//Get all categories
const getAllCat = async () => {
  try {
    const axiosRespone = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/categories`,
      {
        withCredentials: true, //axios send automatically cookies when we apply this property
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespone.data;
  } catch (error) {
    const errorMessage =
      error.respone?.data?.message ||
      error.message ||
      "something went wrong please try again";
    return Promise.reject(errorMessage);
  }
};

//Getting single category
const getSingleCat = async (slug) => {
  try {
    const axiosRespone = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/categories/${slug}`,
      {
        withCredentials: true, //axios send automatically cookies when we apply this property
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespone.data;
  } catch (error) {
    const errorMessage =
      error.respone?.data?.message ||
      error.message ||
      "something went wrong please try again";
    return Promise.reject(errorMessage);
  }
};

// delete Categories
const deleteCat = async (slug) => {
  try {
    const axiosRespone = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/categories/${slug}`,
      {
        withCredentials: true, //axios send automatically cookies when we apply this property
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespone.data;
  } catch (error) {
    const errorMessage =
      error.respone?.data?.message ||
      error.message ||
      "something went wrong please try again";
    return Promise.reject(errorMessage);
  }
};
const updateCat = async ({name, slug}) => {
  try {
    const axiosRespone = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/categories/${slug}`,
      { name },
      {
        withCredentials: true, //axios send automatically cookies when we apply this property
        headers: { "Content-Type": "application/json" },
      }
    );
    return axiosRespone.data;
   
  } catch (error) {
    const errorMessage =
      error.respone?.data?.message ||
      error.message ||
      "something went wrong please try again";
    return Promise.reject(errorMessage);
  }
};

const categoriesService = {
  createCat,
  getAllCat,
  deleteCat,
  getSingleCat,
  updateCat,
};

export default categoriesService;
