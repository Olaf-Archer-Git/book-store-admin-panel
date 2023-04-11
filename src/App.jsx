import { Routes, Route } from "react-router-dom";
import { ColorContext, useMode } from "./utils/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Login from "./pages/login/Login";
import ForgotPassword from "./pages/password/ForgotPassword";
import ResetPassword from "./pages/password/ResetPassword";
import Layout from "./components/Layout";
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import OrderList from "./pages/orders/OrderList";
import QueryList from "./pages/queries/QueryList";
import AddProduct from "./pages/products/AddProduct";
import ProductList from "./pages/products/ProductList";
import AddCategory from "./pages/categories/AddCategory";
import CategoryList from "./pages/categories/CategoryList";
import AddBlog from "./pages/blogs/AddBlog";
import BlogList from "./pages/blogs/BlogList";
import AddDiscount from "./pages/discounts/AddDiscount";
import DiscountList from "./pages/discounts/DiscountList";

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset" element={<ResetPassword />} />

          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="order-list" element={<OrderList />} />
            <Route path="query-list" element={<QueryList />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="product/:id" element={<AddProduct />} />
            <Route path="products-list" element={<ProductList />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="category-list" element={<CategoryList />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog/:id" element={<AddBlog />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="discount" element={<AddDiscount />} />
            <Route path="discount-list" element={<DiscountList />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorContext.Provider>
  );
};

export default App;
