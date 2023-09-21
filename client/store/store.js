import { configureStore } from '@reduxjs/toolkit'
import sharedDataReducer from '../slices/sharedDataSlice'
import selectedItemReducer from '../slices/selectedItemSlice'

const store = configureStore({
    reducer: {
        sharedData: sharedDataReducer,
        selectedItem: selectedItemReducer
    },
})

export default store