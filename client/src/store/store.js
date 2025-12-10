import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice/index.js";
import adminProductReducer from "./admin/product-slice/index.js";
import shoppingProductReducer from "./shop/product-slice/index.js";
import shoppingCartReducer from "./shop/cart-slice/index.js";
import addressReducer from "./shop/address-slice/index.js";
import shopOrderSlice from "./shop/order-slice/index.js";
import shopSearchSlice from "./shop/search-slice/index.js";
import adminOrderSlice from "./admin/order-slice/index.js";
import adminDashboardSlice from "./admin/dashboard-slice/index.js";
import commonFeatureSlice from "./common-slice/index.js";
import shopReviewSlice from "./shop/review-slice/index.js";


const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductReducer,
        shoppingProducts: shoppingProductReducer,
        shoppingCart: shoppingCartReducer,
        shoppingAddress: addressReducer,
        shopOrder: shopOrderSlice,
        shopSearch: shopSearchSlice,
        adminOrder: adminOrderSlice,
        adminDashboard: adminDashboardSlice,
        commonFeature: commonFeatureSlice,
        shopReview: shopReviewSlice,
    },
});

export default store;