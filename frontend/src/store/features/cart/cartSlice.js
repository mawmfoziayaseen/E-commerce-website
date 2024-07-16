import { createSlice } from "@reduxjs/toolkit";

const LoadStateFromLocalStorage = () => {
  try {
    const cartData = window.localStorage.getItem("cart");
    if (cartData === null) {
      return { items: [] };
    }

    return JSON.parse(cartData); //this line load cart items from local storage if items present there
  } catch (error) {
    console.log("Error while loading cart items", error);
    return {
      items: [],
    };
  }
};

const saveStateIntoLocalStroage = (state) => {
  try {
    const cartData = JSON.stringify(state);
    window.localStorage.setItem("cart", cartData);
  } catch (error) {
    console.log("Error while saving cart items", error);
  }
};

const initialState = LoadStateFromLocalStorage();
// use this export in store file, authReducer
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => {
        return;
        i.productId == item.productId;
      });

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      saveStateIntoLocalStroage(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => {
        return item.productId != itemId;
      });
      saveStateIntoLocalStroage(state);
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.items.find((item) => {
        return item.productId == productId;
      });
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      saveStateIntoLocalStroage(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
