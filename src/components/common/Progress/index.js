import React from "react";
import { Box, LinearProgress } from "@mui/material";

import styles from "./index.module.scss";

const BAR_COLOR = {
  blue: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundImage: "linear-gradient(#00b4ff,#0068ff)",
    },
  },
  red: {
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundImage: "linear-gradient(#f1cf6b,#f05769)",
    },
  },
};

const Progress = ({ color = "blue", title, percent, label }) => {
  return (
    <Box className={styles.progress}>
      <Box className={styles.title}>{title}</Box>
      <Box className={styles.progressWrapper}>
        <LinearProgress
          className={styles.bar}
          variant="determinate"
          sx={BAR_COLOR[color]}
          value={percent}
        />
        <Box className={styles.label}>{label}</Box>
      </Box>
    </Box>
  );
};

export default Progress;
