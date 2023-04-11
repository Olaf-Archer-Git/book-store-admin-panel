import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { setError, setPending } from "../../setReducer";
import { uploadService } from "./uploadService";

const initialState = {
  images: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const resetState = createAction("Reset_all");

export const uploadImage = createAsyncThunk(
  "image/upload-image",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }

      return await uploadService.uploadImage(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteImage = createAsyncThunk(
  "image/delete-image",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadImageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, setPending)
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImage.rejected, setError)

      .addCase(deleteImage.pending, setPending)
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(deleteImage.rejected, setError)

      .addCase(resetState, () => initialState);
  },
});

export default uploadImageSlice.reducer;
