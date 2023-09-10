import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Stack } from "@mui/material";
import { emptyDirector } from "../../constants";
import "./DirectorItem.css";

function DirectorItem() {
  const directors = useSelector((state) => state.directorsList.directors);

  const { id } = useParams();

  const producer = directors.find((director) => director.id === Number(id));

  const director = producer ? producer : emptyDirector;

  return (
    <Grid container>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        sm={12}
        xs={12}
        className="director-header"
      >
        <h1>{director.fillName}</h1>
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <img src={director.image} alt="director-viev" className="item-img" />
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <Stack>
          <h2>Biography</h2>
          <h3>Filmography</h3>
          {director.films.map((film, id) => (
            <p key={id}>{film}</p>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default DirectorItem;
