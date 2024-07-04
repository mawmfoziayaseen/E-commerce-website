import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService.js";


// use this function to register page
export const addProduct = createAsyncThunk(
    "categories/addProduct",
    async (inputValues, thunkAPI) => {
      try {
        const respone = await productService.createProduct(inputValues);
        return respone;
        console.log(respone);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
// use this function to get Products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (thunkAPI) => {
    try {
      const respone = await productService.getAllProd();
      return respone;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

  const initialState = {
    products: [],
    status: "idle",
    error: null,
  };
  // use this export in store file, authReducer
  export const productsSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(addProduct.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(addProduct.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.products = action.payload;
        })
        .addCase(addProduct.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        })
        .addCase(getAllProducts.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(getAllProducts.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.products = action.payload;
        })
        .addCase(getAllProducts.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
  
       
    },
  });
  
  // Action creators are generated for each case reducer function

  
  export default productsSlice.reducer;
  