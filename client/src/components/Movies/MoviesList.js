import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, List, ListItem, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteMovie } from "../../store/slices/moviesSlice";

function MoviesList({ movies }) {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteMovie(id));
  };

  return (
    <Box className="movie-list-container">
      <List>
        {movies.map((movie) => {
          return (
            <Stack key={movie.movie_id} direction="row">
              <ListItem>
                <Link to={`${movie.movie_id}`}>{movie.title}</Link>
              </ListItem>
              <ButtonGroup>
                <Button startIcon={<EditRoundedIcon />}>
                  <Link to={`add/${movie.movie_id}`}>Edit</Link>
                </Button>
                <Button
                  onClick={() => onDelete(movie.movie_id)}
                  startIcon={<DeleteForeverRoundedIcon />}
                >
                  Del
                </Button>
              </ButtonGroup>
            </Stack>
          );
        })}
      </List>
    </Box>
  );
}

export default MoviesList;
