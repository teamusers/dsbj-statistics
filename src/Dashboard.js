import React from "react";
import { Box, Grid, Stack } from "@mui/material";

import Navbar from "./components/Navbar";
import LeftTop from "./components/LeftTop";
import LeftMiddle from "./components/LeftMiddle";
import LeftBottom from "./components/LeftBottom";
import RightTop from "./components/RightTop";
import RightBottom from "./components/RightBottom";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  return (
    <Box className={styles.dashboard}>
      <Grid container>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
      </Grid>
      <Grid container className={styles.container}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box className={styles.left}>
              <LeftTop className={styles.leftTop} />
              <LeftMiddle className={styles.leftMiddle} />
            </Box>
            <Box className={styles.right}>
              <RightTop className={styles.rightTop} />
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <LeftBottom className={styles.leftBottom} />
            <RightBottom className={styles.rightBottom} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
