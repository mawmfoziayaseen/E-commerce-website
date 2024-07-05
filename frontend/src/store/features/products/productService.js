import axios from "axios";

// Add product
const createProduct = async (inputValues) => {
    try {
      const axiosRespone = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products`,
        inputValues,
        {
          withCredentials: true, //axios send automatically cookies when we apply this property
          headers: { "Content-Type": "multipart/form-data" },
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

  //Get all Products
const getAllProd = async () => {
  try {
    const axiosRespone = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products`,
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

// delete Product
const deleteProd = async (productId) => {
  try {
    const axiosRespone = await axios.delete(
      `${import.meta.env.VITE_BASE_URL}/products/${productId}`,
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
// get single product 
const getSingleProd = async (productId) => {
  try {
    const axiosRespone = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/products/${productId}`,
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

// update product
const updateProd = async ({inputValues,productId}) => {
  try {
    const axiosRespone = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/products/${productId}`,
      inputValues,
      {
        withCredentials: true, //axios send automatically cookies when we apply this property
        headers: { "Content-Type": "multipart/form-data" },
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

  
const productServices = {
   
    createProduct,
    getAllProd ,
    deleteProd,
    getSingleProd,
    updateProd,
  };
  
  export default productServices;