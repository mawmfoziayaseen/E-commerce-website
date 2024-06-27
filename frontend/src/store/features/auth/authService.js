import axios from 'axios';

// use this funcction in authslice.js =>  createAsyncThunk

const registerUser = async (inputValues) => {
    try {
        const axiosRespone = await axios
            .post(`${import.meta.env.VITE_BASE_URL}/users/register`, inputValues, {
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

const loginUser = async (inputValues) => {
    try {
        const axiosRespone = await axios
            .post(`${import.meta.env.VITE_BASE_URL}/users/login`, inputValues, {
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
const authService = { loginUser,registerUser }

export default authService;