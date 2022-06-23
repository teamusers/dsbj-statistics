import React from "react";
import { Box } from "@mui/material";

import styles from "./index.module.scss";

const Circle1 = ({ value, description, label }) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.circle}>
        <Box className={styles.value}>{value}</Box>
        <Box className={styles.description}>{description}</Box>
      </Box>
      <Box className={styles.label}>{label}</Box>
    </Box>
  );
};

export default Circle1;
