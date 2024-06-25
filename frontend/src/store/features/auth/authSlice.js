import { createSlice } from '@reduxjs/toolkit'

const initialState = null;

export const outhSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = outhSlice.actions

export default outhSlice.reducer