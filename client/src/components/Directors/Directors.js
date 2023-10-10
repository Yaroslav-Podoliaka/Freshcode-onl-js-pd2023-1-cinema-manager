import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { getAllDirectors } from "../../store/slices/directorsSlice";
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
        <Route path=":directorId" element={<DirectorItem />} />
        <Route
          path="add"
          element={<Navigate to="/directors/add/:directorId" />}
        />
      </Routes>
    </Box>
  );
}

export default Directors;
