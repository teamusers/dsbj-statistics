import React, { useState, useEffect } from "react";
import { Box, LinearProgress } from "@mui/material";
import cn from "classnames";

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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === percent) {
          return percent;
        }
        const diff = 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [percent]);

  return (
    <Box className={styles.progress}>
      <Box className={styles.title}>{title}</Box>
      <Box className={styles.progressWrapper}>
        <LinearProgress
          variant="determinate"
          className={styles.bar}
          sx={BAR_COLOR[color]}
          value={progress}
        />
        <Box
          className={cn(styles.label, {
            [styles[color]]: color,
          })}
        >
          {label}
        </Box>
      </Box>
    </Box>
  );
};

export default Progress;
