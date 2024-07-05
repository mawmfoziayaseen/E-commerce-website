import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService.js";

// use this function in products
export const addProduct = createAsyncThunk(
  "products/addProduct",
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
// use this function to get all Products
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
// use this function to delete products
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const respone = await productService.deleteProd(productId);
      return respone;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
// use this function to delete products
export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct ",
  async (productId, thunkAPI) => {
    try {
      const respone = await productService.getSingleProd(productId);
      return respone;
     
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// use this function in  update singleproducts
export const updateSingleProduct = createAsyncThunk(
  "products/updateSingleProduct",
  async ({ inputValues, productId }, thunkAPI) => {
    try {
      const respone = await productService.updateProd({
        inputValues,
        productId,
      });
      return respone;
      console.log(respone);
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
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateSingleProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateSingleProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(updateSingleProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function

export default productsSlice.reducer;
