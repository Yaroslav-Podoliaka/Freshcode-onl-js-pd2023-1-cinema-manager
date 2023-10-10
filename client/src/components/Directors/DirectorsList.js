import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, List, ListItem, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteDirector } from "../../store/slices/directorsSlice";

function DirectorsList({ directors }) {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteDirector(id));
  };

  return (
    <Box className="director-list-container">
      <List>
        {directors.map((director) => {
          return (
            <Stack key={director.director_id} direction="row">
              <ListItem>
                <Link to={`${director.director_id}`}>{director.full_name}</Link>
              </ListItem>
              <ButtonGroup>
                <Button startIcon={<EditRoundedIcon />}>
                  <Link to={`add/${director.director_id}`}>Edit</Link>
                </Button>
                <Button
                  onClick={() => onDelete(director.director_id)}
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

export default DirectorsList;
