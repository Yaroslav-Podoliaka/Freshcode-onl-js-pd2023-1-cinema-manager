import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import { emptyMovie } from "../../constants";
import "./MovieItem.css";

function MovieItem() {
  const movies = useSelector((state) => state.moviesList.movies);

  const { id } = useParams();

  const film = movies.find((movie) => movie.id === Number(id));

  const movie = film ? film : emptyMovie;

  return (
    <Grid container>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        sm={12}
        xs={12}
        className="movie-header"
      >
        <h1>{movie.title}</h1>
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <img src={movie.poster} alt="poster" className="item-img" />
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <Stack>
          <h2>Movie definition</h2>
          <h3>Actors</h3>
          {movie.stars.map((star, id) => (
            <p key={id}>{star}</p>
          ))}
          <h3>Directors</h3>
          {movie.producers.map((producer, id) => (
            <p key={id}>{producer}</p>
          ))}
          <h3>Studios</h3>
          {movie.companies.map((company, id) => (
            <p key={id}>{company}</p>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default MovieItem;
