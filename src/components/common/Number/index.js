import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";

import styles from "./index.module.scss";

const Square = ({ text }) => {
  return <Box className={styles.square}>{text} </Box>;
};

const Dot = () => {
  return <Box className={styles.dot} />;
};

const Number = ({ title, value }) => {
  const percent = 100;
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState("");

  const _enhanceText = (input) => {
    return input.toFixed(4).padStart(8, input ? " " : 0);
  };

  useEffect(() => {
    if (value) {
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
    }
  }, [percent, value]);

  useEffect(() => {
    if (progress === percent) {
      setText(_enhanceText(value));
    } else {
      setText(_enhanceText((+value / 100) * progress));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <Box className={styles.number}>
      <Box className={styles.title}>{title}</Box>
      <Stack className={styles.numberWrapper} direction="row" spacing="12px">
        {text.split("").map((item, index) => {
          if (item !== ".") {
            return <Square key={index} text={item} />;
          }
          return <Dot key={index} />;
        })}
      </Stack>
    </Box>
  );
};

export default Number;
