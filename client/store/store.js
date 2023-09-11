import { configureStore } from '@reduxjs/toolkit';
import sharedDataReducer from '../slices/sharedDataSlice';

const store = configureStore({
    reducer: {
        sharedData: sharedDataReducer,
        // Add other slices as needed
    },
});

export default store;