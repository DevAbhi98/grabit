import { configureStore } from "@reduxjs/toolkit";
import uiSliceReducer from "./slices/ui-slice.js"
import restaurantReducer from "./slices/restaurants-slice.js"

const store = configureStore({
    reducer:{
        ui: uiSliceReducer,
        restaurants: restaurantReducer
    }
})

export default store