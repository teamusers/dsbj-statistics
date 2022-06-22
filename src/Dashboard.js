import React from "react";
import { Box, Grid, Stack } from "@mui/material";

import Navbar from "./components/Navbar";
import LeftTop from "./components/LeftTop";
import LeftMiddle from "./components/LeftMiddle";
import LeftBottom from "./components/LeftBottom";
import RightTop from "./components/RightTop";
import RightMiddle from "./components/RightMiddle";
import RightBottom from "./components/RightBottom";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <Box className={styles.app}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <LeftTop />
            <RightTop />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <LeftMiddle />
            <RightMiddle />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <LeftBottom />
            <RightBottom />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
