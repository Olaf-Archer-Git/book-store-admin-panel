export const setPending = (state) => {
  state.isLoading = true;
};

export const setError = (state, action) => {
  state.isError = true;
  state.isSuccess = false;
  state.isLoading = false;
  state.message = action.error;
};
