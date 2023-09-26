import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDirectors } from "../../store/slices/directorsSlice";
import { Box, Button } from "@mui/material";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import DirectorsList from "./DirectorsList";
import DirectorItem from "./DirectorItem";

function Directors() {
  const directors = useSelector((state) => state.directorsList.directors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDirectors());
  }, [dispatch]);

  return (
    <Box className="director-container">
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
        <Route path="/" element={<DirectorsList directors={directors} />} />
        <Route path=":id" element={<DirectorItem />} />
        <Route path="add" element={<Navigate to="/directors/add/:id" />} />
      </Routes>
    </Box>
  );
}

export default Directors;
