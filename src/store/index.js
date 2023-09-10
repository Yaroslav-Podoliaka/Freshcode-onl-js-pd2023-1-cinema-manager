import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import actorsReducer from "./slices/actorsSlice";
import directorsReducer from "./slices/directorsSlice";
import studiosReducer from "./slices/studiosSlice";

export default configureStore({
  reducer: {
    moviesList: moviesReducer,
    actorsList: actorsReducer,
    directorsList: directorsReducer,
    studiosList: studiosReducer,
  },
});
