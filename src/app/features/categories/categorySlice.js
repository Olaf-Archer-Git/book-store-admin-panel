import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setPending, setError } from "../../setReducer";
import { categoryService } from "./categoryService";

const initialState = {
  categories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const getAllCategories = createAsyncThunk(
  "category/get-categories",
  async (thunkAPI) => {
    try {
      return await categoryService.getAllCategories();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create-category",
  async (categoryData, thunkAPI) => {
    try {
      return await categoryService.createCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete-category",
  async (id, thunkAPI) => {
    try {
      return await categoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, setPending)
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categories = action.payload;
      })
      .addCase(getAllCategories.rejected, setError)

      .addCase(createCategory.pending, setPending)
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createCategory.rejected, setError)

      .addCase(deleteCategory.pending, setPending)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCategory = action.payload;
      })
      .addCase(deleteCategory.rejected, setError)

      .addCase(resetState, () => initialState);
  },
});
export default categorySlice.reducer;
