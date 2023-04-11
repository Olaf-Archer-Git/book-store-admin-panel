import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setPending, setError } from "../../setReducer";
import { orderService } from "./orderService";

const initialState = {
  orders: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllOrders = createAsyncThunk(
  "orders/get-orders",
  async (thunkAPI) => {
    try {
      const response = await orderService.getOrders();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, setPending)
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, setError);
  },
});

export default orderSlice.reducer;
