import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { getAllActors } from "../../store/slices/actorsSlice";
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
        <Route path=":actorId" element={<ActorItem />} />
        <Route path="add" element={<Navigate to="/actors/add/:actorId" />} />
      </Routes>
    </Box>
  );
}

export default Actors;
