import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Button, ButtonGroup, List, ListItem, Stack } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import { deleteStudio } from "../../store/slices/studiosSlice";

function StudiosList({ studios }) {
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch(deleteStudio(id));
  };

  return (
    <Box className="studio-list-container">
      <List>
        {studios.map((studio) => {
          return (
            <Stack key={studio.studio_id} direction="row">
              <ListItem>
                <Link to={`${studio.studio_id}`}>{studio.title}</Link>
              </ListItem>
              <ButtonGroup>
                <Button startIcon={<EditRoundedIcon />}>
                  <Link to={`add/${studio.studio_id}`}>Edit</Link>
                </Button>
                <Button
                  onClick={() => onDelete(studio.studio_id)}
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

export default StudiosList;
