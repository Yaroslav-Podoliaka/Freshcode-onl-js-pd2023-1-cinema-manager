import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/cinema-service";
import { setError, setFetching } from "../../reducers-service";

const SLICE_NAME = "directors";

const initialState = {
  directors: [],
  isFetching: false,
  erroe: null,
};

export const getAllDirectors = createAsyncThunk(
  `${SLICE_NAME}/getAllDirectors`,
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await api.get(`/${SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createDirector = createAsyncThunk(
  `${SLICE_NAME}/createDirector`,
  async function (newDirector, { rejectWithValue }) {
    try {
      const { data } = await api.post(`/${SLICE_NAME}`, newDirector);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDirector = createAsyncThunk(
  `${SLICE_NAME}/updateDirector`,
  async function (changedDirector, { rejectWithValue }) {
    try {
      const { data } = await api.put(
        `/${SLICE_NAME}/${changedDirector.id}`,
        changedDirector
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteDirector = createAsyncThunk(
  `${SLICE_NAME}/deleteDirector`,
  async function (id, { rejectWithValue }) {
    try {
      await api.delete(`/${SLICE_NAME}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const directorsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: {
    [getAllDirectors.fulfilled]: (state, { payload }) => {
      state.directors = payload;
      state.isFetching = false;
      state.error = null;
    },
    [createDirector.fulfilled]: (state, { payload }) => {
      state.directors.push(payload);
      state.isFetching = false;
      state.error = null;
    },
    [updateDirector.fulfilled]: (state, { payload }) => {
      state.directors = state.directors.map((director) =>
        director.id === payload.id ? payload : director
      );
      state.isFetching = false;
      state.error = null;
    },
    [deleteDirector.fulfilled]: (state, { payload }) => {
      state.directors = state.directors.filter(
        (director) => director.id !== payload
      );
      state.isFetching = false;
      state.error = null;
    },

    [getAllDirectors.pending]: setFetching,
    [createDirector.pending]: setFetching,
    [updateDirector.pending]: setFetching,
    [deleteDirector.pending]: setFetching,

    [getAllDirectors.rejected]: setError,
    [createDirector.rejected]: setError,
    [updateDirector.rejected]: setError,
    [deleteDirector.rejected]: setError,
  },
});

export default directorsSlice.reducer;
