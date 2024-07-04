import axios from "axios";


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

  
const productServices = {
   
    createProduct,
  };
  
  export default productServices;