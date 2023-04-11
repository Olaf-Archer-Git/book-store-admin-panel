import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setError, setPending } from "../../setReducer";
import { tokenConfig } from "../../../utils/tokenConfig";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { discountService } from "./discountService";

const initialState = {
  discounts: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllDiscounts = createAsyncThunk(
  "discount/get-discounts",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${baseURL}discount`, tokenConfig);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createDiscount = createAsyncThunk(
  "discount/create-discount",
  async (discountData, thunkAPI) => {
    try {
      return await discountService.createDiscount(discountData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteDiscount = createAsyncThunk(
  "discount/delete-discount",
  async (id, thunkAPI) => {
    try {
      return await discountService.deleteDiscount(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDiscounts.pending, setPending)
      .addCase(getAllDiscounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.discounts = action.payload;
      })
      .addCase(getAllDiscounts.rejected, setError)

      .addCase(createDiscount.pending, setPending)
      .addCase(createDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdDiscount = action.payload;
      })
      .addCase(createDiscount.rejected, setError)

      .addCase(deleteDiscount.pending, setPending)
      .addCase(deleteDiscount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedDiscount = action.payload;
      })
      .addCase(deleteDiscount.rejected, setError);
  },
});

export default discountSlice.reducer;
