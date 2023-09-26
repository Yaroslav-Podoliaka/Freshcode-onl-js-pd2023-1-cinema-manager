import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/cinema-service";
import { setError, setFetching } from "../../reducers-service";

const SLICE_NAME = "studios";

const initialState = {
  studios: [],
  isFetching: false,
  error: null,
};

export const getAllStudios = createAsyncThunk(
  `${SLICE_NAME}/getAllstudios`,
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await api.get(`/${SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createStudio = createAsyncThunk(
  `${SLICE_NAME}/createStudio`,
  async function (newStudio, { rejectWithValue }) {
    try {
      const { data } = await api.post(`/${SLICE_NAME}`, newStudio);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateStudio = createAsyncThunk(
  `${SLICE_NAME}/updateStudio`,
  async function (changedStudio, { rejectWithValue }) {
    try {
      const { data } = await api.put(
        `/${SLICE_NAME}/${changedStudio.id}`,
        changedStudio
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteStudio = createAsyncThunk(
  `${SLICE_NAME}/deleteStudio`,
  async function (id, { rejectWithValue }) {
    try {
      await api.delete(`/${SLICE_NAME}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const studiosSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: {
    [getAllStudios.fulfilled]: (state, { payload }) => {
      state.studios = payload;
      state.isFetching = false;
      state.error = null;
    },
    [createStudio.fulfilled]: (state, { payload }) => {
      state.studios.push(payload);
      state.isFetching = false;
      state.error = null;
    },
    [updateStudio.fulfilled]: (state, { payload }) => {
      state.studios = state.studios.map((studio) =>
        studio.id === payload.id ? payload : studio
      );
      state.isFetching = false;
      state.error = null;
    },
    [deleteStudio.fulfilled]: (state, { payload }) => {
      state.studios = state.studios.filter((studio) => studio.id !== payload);
      state.isFetching = false;
      state.error = null;
    },

    [getAllStudios.pending]: setFetching,
    [createStudio.pending]: setFetching,
    [updateStudio.pending]: setFetching,
    [deleteStudio.pending]: setFetching,

    [getAllStudios.rejected]: setError,
    [createStudio.rejected]: setError,
    [updateStudio.rejected]: setError,
    [deleteStudio.rejected]: setError,
  },
});

export default studiosSlice.reducer;
