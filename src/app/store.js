import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/features/auth/authSlice";
import customerReducer from "../app/features/customer/customerSlice";
import orderReducer from "../app/features/order/orderSlice";
import queryReducer from "../app/features/query/querySlice";
import uploadReducer from "../app/features/upload/uploadSlice";
import categoryReducer from "../app/features/categories/categorySlice";
import productReducer from "../app/features/product/productSlice";
import blogReducer from "../app/features/blog/blogSlice";
import discountReducer from "../app/features/discounts/discountSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    order: orderReducer,
    query: queryReducer,
    upload: uploadReducer,
    category: categoryReducer,
    product: productReducer,
    blog: blogReducer,
    discount: discountReducer,
  },
});
