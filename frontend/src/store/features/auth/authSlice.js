import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService.js';

// use this function to register page
export const register = createAsyncThunk
    ("auth/register"
        , async (inputValues, thunkAPI) => {
            try {
                const respone = await authService.registerUser(inputValues);
                return respone;
            } catch (error) {
                return thunkAPI.rejectWithValue(error);

            }
        });


// use this function to login page
export const login = createAsyncThunk("auth/login", async (inputValues, thunkAPI) => {
    try {
        const respone = await authService.loginUser(inputValues);
        window.localStorage.setItem("user", JSON.stringify(respone));
        return respone;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);

    }
});

// use this function to logout page    in dashboard
export const logout = createAsyncThunk
    ("auth/logout"
        , async ( thunkAPI) => {
            try {
                const respone = await authService.logoutUser();
                window.localStorage.removeItem("user");
                return respone;
            } catch (error) {
                return thunkAPI.rejectWithValue(error);

            }
        });

const getUserDataFromLocalStroge = window.localStorage.getItem("user") ?
    JSON.parse(window.localStorage.getItem("user")) : null;

const initialState = {
    user: getUserDataFromLocalStroge,
    status: "idle",
    error: null
}
// use this export in store file, authReducer
export const outhSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.status = "loading";
        })
            .addCase(login.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },

});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = outhSlice.actions

export default outhSlice.reducer