import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { emptyActor } from "../../constants";
import { Grid, Stack } from "@mui/material";
import "./ActorItem.css";

function ActorItem() {
  const actors = useSelector((state) => state.actorsList.actors);

  const { id } = useParams();

  const star = actors.find((actor) => actor.id === Number(id));

  const actor = star ? star : emptyActor;

  return (
    <Grid container>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        sm={12}
        xs={12}
        className="actor-header"
      >
        <h1>{actor.fullName}</h1>
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <img src={actor.image} alt="actor-viev" className="item-img" />
      </Grid>
      <Grid item lg={6} md={6} xl={6} sm={6} xs={6}>
        <Stack>
          <h2>Biography</h2>
          <h3>Filmography</h3>
          {actor.films.map((film, id) => (
            <p key={id}>{film}</p>
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ActorItem;
