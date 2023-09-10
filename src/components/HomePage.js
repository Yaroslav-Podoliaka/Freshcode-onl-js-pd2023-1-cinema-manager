import React from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import { nanoid } from "nanoid";

function HomePage() {
  const posters = [
    {
      title: "avatar-way-of-water",
      url: "https://poglyad.tv/storage/resized/lg/news/98049fc6-3893-464b-84b7-d8d21a69d4b5/19_avatar.jpeg",
    },
    {
      title: "lord-of-the-rings",
      url: "https://www.quirkybyte.com/wp-content/uploads/2021/06/the-lord-of-the-rings-cinematic-universe-1227689-1280x0-1.jpeg",
    },
    {
      title: "doctor-strange",
      url: "https://images.thedirect.com/media/article_full/doctor-strange-2-poster-mcu.jpg",
    },
    {
      title: "gladiator",
      url: "https://cdn.wallpapersafari.com/33/53/DtQTUd.jpg",
    },
    {
      title: "game-of-thrones",
      url: "https://dalma.news/wp-content/uploads/2019/05/5cd5a015b73bf.jpg",
    },
  ];

  return (
    <>
      <h1>Cinema Manager</h1>
      <Carousel interval="2000" duration="1000" animation="slide">
        {posters.map((poster) => {
          return (
            <Box key={nanoid()}>
              <Paper>
                <img
                  src={poster.url}
                  alt={poster.title}
                  style={{ width: "100%" }}
                />
              </Paper>
            </Box>
          );
        })}
      </Carousel>
    </>
  );
}

export default HomePage;
