import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice.js'
import categoriesReducer from './features/Categories/CategoriesSlice.js'

import productsReducer from './features/products/productSlice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoriesReducer,
    products: productsReducer,
  },
});