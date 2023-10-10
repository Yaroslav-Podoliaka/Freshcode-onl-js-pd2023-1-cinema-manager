import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import { emptyStudio } from "../../constants";
import "./StudioItem.css";

function StudioItem() {
  const studios = useSelector((state) => state.studiosList.studios);

  const { studioId } = useParams();

  const company = studios.find(
    (studio) => studio.studio_id === Number(studioId)
  );

  const studio = company ? company : emptyStudio;

  return (
    <Grid container>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        sm={12}
        xs={12}
        className="studio-header"
      >
        <h1>{studio.title}</h1>
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <img src={studio.poster} alt="studio-viev" className="item-img" />
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <Stack>
          <h2>Year fondation</h2>
          {studio.year_fondation}
          <h2>Location</h2>
          {studio.location}
          <h3>History</h3>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default StudioItem;
