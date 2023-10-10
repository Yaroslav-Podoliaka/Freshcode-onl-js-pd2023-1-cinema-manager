import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, List, ListItem, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
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
            <Stack key={actor.actor_id} direction="row">
              <ListItem>
                <Link to={`${actor.actor_id}`}>{actor.full_name}</Link>
              </ListItem>
              <ButtonGroup>
                <Button startIcon={<EditRoundedIcon />}>
                  <Link to={`add/${actor.actor_id}`}>Edit</Link>
                </Button>
                <Button
                  onClick={() => onDelete(actor.actor_id)}
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
