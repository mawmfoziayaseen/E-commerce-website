import axios from 'axios';

// use this funcction in authslice.js =>  createAsyncThunk

const createCat = async (inputValues) => {
    try {
        const axiosRespone = await axios
            .post(`${import.meta.env.VITE_BASE_URL}/categories`, inputValues, {
                withCredentials: true,   //axios send automatically cookies when we apply this property
                headers: { "Content-Type": "application/json" },
            })
        return axiosRespone.data;
    } catch (error) {
        const errorMessage = error
        .respone?.data?.message || error.message || "something went wrong please try again";
        return Promise.reject(errorMessage);


    }
};

const categoriesService = {createCat}

export default categoriesService;