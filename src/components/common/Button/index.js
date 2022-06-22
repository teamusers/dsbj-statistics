import React from "react";
import { Box, Button as MUIButton } from "@mui/material";
import cn from "classnames";

import styles from "./index.module.scss";

const Button = ({ side, children, ...rest }) => {
  return (
    <MUIButton
      className={cn(styles.container, { [styles[side]]: side })}
      {...rest}
    >
      <Box className={cn(styles.skewFix, { [styles[side]]: side })}>{children}</Box>
    </MUIButton>
  );
};

export default Button;
