import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService.js';


// use this function to login page
export const login = createAsyncThunk("auth/logic", async (inputValues, thunkAPI) => {
    try {
        return await authService.loginUser(inputValues);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);

    }


});
const initialState = {
    user: null,
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