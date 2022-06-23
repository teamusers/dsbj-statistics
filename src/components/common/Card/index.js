import React from "react";
import { Box } from "@mui/material";
import cn from "classnames";

import styles from "./index.module.scss";

const Card = ({
  size = "small",
  title,
  titleAlign = "center",
  children,
  ...rest
}) => {
  return (
    <Box className={cn(styles.card, { [styles[size]]: size })} {...rest}>
      <Box className={cn(styles.title, { [styles[titleAlign]]: size })}>
        {title}
      </Box>
      {children}
    </Box>
  );
};

export default Card;
