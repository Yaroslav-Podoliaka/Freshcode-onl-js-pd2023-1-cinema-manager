import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllActors } from "../../store/slices/actorsSlice";
import { Box, Button } from "@mui/material";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import ActorsList from "./ActorsList";
import ActorItem from "./ActorItem";

function Actors() {
  const actors = useSelector((state) => state.actorsList.actors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllActors());
  }, [dispatch]);

  return (
    <Box className="actor-container">
      <Button
        variant="contained"
        size="small"
        sx={{
          p: "5px 30px",
          m: "5px",
          backgroundColor: "primary.dark",
          fontSize: "16px",
        }}
      >
        <Link style={{ color: "white" }} to="add">
          Add
        </Link>
      </Button>
      <Routes>
        <Route path="/" element={<ActorsList actors={actors} />} />
        <Route path=":id" element={<ActorItem />} />
        <Route path="add" element={<Navigate to="/actors/add/:id" />} />
      </Routes>
    </Box>
  );
}

export default Actors;
