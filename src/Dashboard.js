import React, { useState, useReducer } from "react";
import { Box, Grid, Modal, TextField, Stack, Button } from "@mui/material";
import { useSnackbar } from "notistack";

import Navbar from "./components/Navbar";
import LeftTop from "./components/LeftTop";
import LeftMiddle from "./components/LeftMiddle";
import LeftBottom from "./components/LeftBottom";
import RightTop from "./components/RightTop";
import RightBottom from "./components/RightBottom";

import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [islogin, setIslogin] = useState(false);
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: "user",
      password: "userpw12",
    }
  );

  const _handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const _handleSubmit = (evt) => {
    evt.preventDefault();

    let data = formInput;

    if (data.username === "user" && data.password === "userpw12") {
      setIslogin(true);
      enqueueSnackbar("Logged in!", { variant: "success" });
      enqueueSnackbar("Last fetched data: 28/6", {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    } else {
      enqueueSnackbar("Wrong username or password!", { variant: "error" });
    }
  };

  return (
    <>
      <Box className={styles.dashboard}>
        {islogin && (
          <>
            {/* <Box className={styles.animation}>
              <Box className={styles.blockWrapper}>
                <Box className={cn(styles.block, styles.block1)} />
                <Box className={cn(styles.block, styles.block2)} />
                <Box className={cn(styles.block, styles.block3)} />
              </Box>
            </Box> */}
            <Grid container>
              <Grid item xs={12}>
                <Navbar />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} className={styles.container}>
                <Box className={styles.left}>
                  <LeftTop className={styles.leftTop} />
                  <LeftMiddle className={styles.leftMiddle} />
                  <LeftBottom className={styles.leftBottom} />
                </Box>
                <Box className={styles.right}>
                  <RightTop className={styles.rightTop} />
                  <RightBottom className={styles.rightBottom} />
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <Modal className={styles.modal} open={!islogin}>
        <>
          <Box className={styles.title}>Login</Box>
          <form className={styles.form} onSubmit={_handleSubmit}>
            <Stack
              className={styles.formContent}
              noValidate
              autoComplete="off"
              spacing={3}
            >
              <TextField
                className={styles.input}
                label="Username"
                variant="filled"
                name="username"
                onChange={_handleInput}
              />
              <TextField
                className={styles.input}
                type="password"
                label="Password"
                variant="filled"
                name="password"
                onChange={_handleInput}
              />
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Stack>
          </form>
        </>
      </Modal>
    </>
  );
};

export default Dashboard;
