import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setError, setPending } from "../../setReducer";
import { queryService } from "./queryService";

const initialState = {
  queries: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getAllQueries = createAsyncThunk(
  "queries/get-all-queries",
  async (thunkAPI) => {
    try {
      return await queryService.getQueries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getSingleQuery = createAsyncThunk(
  "query/get-single-queries",
  async (id, thunkAPI) => {
    try {
      return await queryService.getQuery(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateQuery = createAsyncThunk(
  "query/update-query",
  async (data, thunkAPI) => {
    try {
      return await queryService.updateQuery(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteQuery = createAsyncThunk(
  "query/delete-queries",
  async (id, thunkAPI) => {
    try {
      return await queryService.deleteQuery(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const querySlice = createSlice({
  name: "queries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllQueries.pending, setPending)
      .addCase(getAllQueries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.queries = action.payload;
      })
      .addCase(getAllQueries.rejected, setError)

      .addCase(getSingleQuery.pending, setPending)
      .addCase(getSingleQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.queryName = action.payload.name;
        state.queryEmail = action.payload.email;
        state.queryStatus = action.payload.status;
        state.queryComment = action.payload.comment;
      })
      .addCase(getSingleQuery.rejected, setError)

      .addCase(updateQuery.pending, setPending)
      .addCase(updateQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedQuery = action.payload;
      })
      .addCase(updateQuery.rejected, setError)

      .addCase(deleteQuery.pending, setPending)
      .addCase(deleteQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedQuery = action.payload;
      })
      .addCase(deleteQuery.rejected, setError);
  },
});

export default querySlice.reducer;
