import axios from 'axios';

// use this funcction in authslice.js =>  createAsyncThunk
const loginUser = async (inputValues) => {
    const axiosRespone = axios
        .post(`${import.meta.env.VITE_BASE_URL}/users/login`, inputValues, {
            withCredentials: true,   //axios send automatically cookies when we apply this property
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
            return response.data;

        })
        .catch((error) => {
            return error.response.data;

        });
    return axiosRespone;
}
const authService = { loginUser }

export default authService;