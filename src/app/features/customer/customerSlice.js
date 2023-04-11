import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setPending, setError } from "../../setReducer";
import { customerService } from "./customerService";

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllUsers = createAsyncThunk(
  "customers/get-customers",
  async (thunkAPI) => {
    try {
      const response = await customerService.getUsers();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, setPending)
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.customers = action.payload;
      })
      .addCase(getAllUsers.rejected, setError);
  },
});

export default customerSlice.reducer;
