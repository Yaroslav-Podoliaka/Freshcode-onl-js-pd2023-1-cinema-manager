import { Box, Grid, List, ListItem } from "@mui/material";
import React from "react";
import Header from "./Header/Header";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "./Footer/Footer";
import ServiceForms from "./ServiceForms/ServiceForms";

function Layout() {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Header />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={12} xs={12}>
          <List>
            <ListItem>
              <NavLink to="/">Home Page</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/movies">Movies</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/actors">Actors</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/directors">Directors</NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="/studios">Studios</NavLink>
            </ListItem>
          </List>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
          <main>
            <Outlet />
          </main>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
          <ServiceForms />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
