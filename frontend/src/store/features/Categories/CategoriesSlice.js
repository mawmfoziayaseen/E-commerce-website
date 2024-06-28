import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import categoriesService from './CategoriesService.js';

// use this function to register page
export const AddCategory = createAsyncThunk
    ("categories/AddCategory "
        , async (inputValues, thunkAPI) => {
            try {
                const respone = await categoriesService.createCat(inputValues);
                return respone;
            } catch (error) {
                return thunkAPI.rejectWithValue(error);

            }
        });


const initialState = {
    categories: [],
    status: "idle",
    error: null
}
// use this export in store file, authReducer
export const categoriesSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder
            .addCase(AddCategory .pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(AddCategory .fulfilled, (state, action) => {
                state.status = "succeeded";
                state.categories = action.payload;
            })
            .addCase(AddCategory .rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    }

});

// Action creators are generated for each case reducer function
// export const { incrementByAmount } = categoriesSlice .actions

export default categoriesSlice .reducer;