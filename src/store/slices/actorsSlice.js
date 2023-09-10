import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/cinema-service";
import { setError, setFetching } from "../../reducers-service";

const SLICE_NAME = "actors";

const initialState = {
  actors: [],
  isFetching: false,
  error: null,
};

export const getAllActors = createAsyncThunk(
  `${SLICE_NAME}/getAllActors`,
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await api.get(`/${SLICE_NAME}`);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createActor = createAsyncThunk(
  `${SLICE_NAME}/createActor`,
  async function (newActor, { rejectWithValue }) {
    try {
      const { data } = await api.post(`/${SLICE_NAME}`, newActor);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateActor = createAsyncThunk(
  `${SLICE_NAME}/updateActor`,
  async function (changedActor, { rejectWithValue }) {
    try {
      const { data } = await api.put(
        `/${SLICE_NAME}/${changedActor.id}`,
        changedActor
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteActor = createAsyncThunk(
  `${SLICE_NAME}/deleteActor`,
  async function (id, { rejectWithValue }) {
    try {
      await api.delete(`/${SLICE_NAME}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const actorsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: {
    [getAllActors.fulfilled]: (state, { payload }) => {
      state.actors = payload;
      state.isFetching = false;
      state.error = null;
    },
    [createActor.fulfilled]: (state, { payload }) => {
      state.actors.push(payload);
      state.isFetching = false;
      state.error = null;
    },
    [updateActor.fulfilled]: (state, { payload }) => {
      state.actors = state.actors.map((actor) =>
        actor.id === payload.id ? payload : actor
      );
      state.isFetching = false;
      state.error = null;
    },
    [deleteActor.fulfilled]: (state, { payload }) => {
      state.actors = state.actors.filter((actor) => actor.id !== payload);
      state.isFetching = false;
      state.error = null;
    },

    [getAllActors.pending]: setFetching,
    [createActor.pending]: setFetching,
    [updateActor.pending]: setFetching,
    [deleteActor.pending]: setFetching,

    [getAllActors.rejected]: setError,
    [createActor.rejected]: setError,
    [updateActor.rejected]: setError,
    [deleteActor.rejected]: setError,
  },
});

export default actorsSlice.reducer;
