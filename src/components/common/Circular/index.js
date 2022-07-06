import React, { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import cn from "classnames";

import styles from "./index.module.scss";

const BAR_COLOR = {
  red: "#ff0749",
  yellow: "#ffe701",
  blue: "#01abf8",
  purple: "#5e6fff",
};

const CircularProgressWithLabel = ({ color, value }) => {
  return (
    <Box
      sx={{ position: "relative", display: "inline-flex" }}
      className={cn(styles.progress, { [styles[color]]: color })}
    >
      <CircularProgress
        variant="determinate"
        size="70px"
        style={{ color: BAR_COLOR[color] }}
        value={value}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box className={styles.value}>{value}</Box>
      </Box>
    </Box>
  );
};

const Circular = ({ color, value, label }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= value ? value : prevProgress + 10
      );
    }, 100);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={styles.container}>
      <Box className={styles.circular}>
        <CircularProgressWithLabel color={color} value={progress} />
      </Box>
      {label && <Box className={styles.label}>{label}</Box>}
    </Box>
  );
};

export default Circular;
