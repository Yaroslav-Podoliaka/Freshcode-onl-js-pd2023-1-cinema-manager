import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/cinema-service";
import { setError, setFetching } from "../../reducers-service";

const SLICE_NAME = "movies";

const initialState = {
  movies: [],
  isFetching: false,
  error: null,
};

export const getAllMovies = createAsyncThunk(
  `${SLICE_NAME}/getAllMovies`,
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await api.get(`/${SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createMovie = createAsyncThunk(
  `${SLICE_NAME}/createMovie`,
  async function (newMovie, { rejectWithValue }) {
    try {
      const { data } = await api.post(`/${SLICE_NAME}`, newMovie);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateMovie = createAsyncThunk(
  `${SLICE_NAME}/updateMovie`,
  async function (changedMovie, { rejectWithValue }) {
    try {
      const { data } = await api.put(
        `/${SLICE_NAME}/${changedMovie.id}`,
        changedMovie
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  `${SLICE_NAME}/deleteMovie`,
  async function (id, { rejectWithValue }) {
    try {
      await api.delete(`/${SLICE_NAME}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const moviesSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: {
    [getAllMovies.fulfilled]: (state, { payload }) => {
      state.movies = payload;
      state.isFetching = false;
      state.error = null;
    },
    [createMovie.fulfilled]: (state, { payload }) => {
      state.movies.push(payload);
      state.isFetching = false;
      state.error = null;
    },
    [updateMovie.fulfilled]: (state, { payload }) => {
      state.movies = state.movies.map((movie) =>
        movie.id === payload.id ? payload : movie
      );
      state.isFetching = false;
      state.error = null;
    },
    [deleteMovie.fulfilled]: (state, { payload }) => {
      state.movies = state.movies.filter((movie) => movie.id !== payload);
      state.isFetching = false;
      state.error = null;
    },

    [getAllMovies.pending]: setFetching,
    [createMovie.pending]: setFetching,
    [updateMovie.pending]: setFetching,
    [deleteMovie.pending]: setFetching,

    [getAllMovies.rejected]: setError,
    [createMovie.rejected]: setError,
    [updateMovie.rejected]: setError,
    [deleteMovie.rejected]: setError,
  },
});

export default moviesSlice.reducer;
