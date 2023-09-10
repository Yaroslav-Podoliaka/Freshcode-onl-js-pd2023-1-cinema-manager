import React from "react";
import { Box, Button, ButtonGroup, List, ListItem, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { useDispatch } from "react-redux";
import { deleteActor } from "../../store/slices/actorsSlice";

function ActorsList({ actors }) {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteActor(id));
  };

  return (
    <Box className="actor-list-container">
      <List>
        {actors.map((actor) => {
          return (
            <Stack key={actor.id} direction="row">
              <ListItem>
                <Link to={`${actor.id}`}>{actor.fullName}</Link>
              </ListItem>
              <ButtonGroup>
                <Button startIcon={<EditRoundedIcon />}>
                  <Link to={`add/${actor.id}`}>Edit</Link>
                </Button>
                <Button
                  onClick={() => onDelete(actor.id)}
                  stsrtIcon={<DeleteForeverRoundedIcon />}
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

export default ActorsList;
