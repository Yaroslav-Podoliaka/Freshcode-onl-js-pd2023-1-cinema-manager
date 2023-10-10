import React, { useEffect } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { getAllStudios } from "../../store/slices/studiosSlice";
import StudiosList from "./StudiosList";
import StudioItem from "./StudioItem";

function Studios() {
  const studios = useSelector((state) => state.studiosList.studios);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStudios());
  }, [dispatch]);

  return (
    <Box>
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
        <Route path="/" element={<StudiosList studios={studios} />} />
        <Route path=":studioId" element={<StudioItem />} />
        <Route path="add" element={<Navigate to="/studios/add/studioId" />} />
      </Routes>
    </Box>
  );
}

export default Studios;
