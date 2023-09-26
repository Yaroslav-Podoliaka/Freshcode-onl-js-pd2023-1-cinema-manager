export const setFetching = (state) => {
  state.isFetching = true;
  state.error = null;
};

export const setError = (state, { payload }) => {
  state.isFetching = false;
  state.error = payload;
};
