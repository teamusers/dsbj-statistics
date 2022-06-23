import React from "react";
import { Box } from "@mui/material";
import cn from "classnames";

import styles from "./index.module.scss";

const Circle = ({ color, value, description, label }) => {
  return (
    <Box className={cn(styles.container, { [styles[color]]: color })}>
      <Box className={cn(styles.circle)}>
        <Box className={styles.value}>{value}</Box>
        <Box className={styles.description}>{description}</Box>
      </Box>
      {label && <Box className={styles.label}>{label}</Box>}
    </Box>
  );
};

export default Circle;
