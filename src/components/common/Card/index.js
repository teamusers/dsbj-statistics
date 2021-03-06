import React from "react";
import { Box, Grid } from "@mui/material";
import cn from "classnames";

import SelectDropdown from "../SelectDropdown";
import styles from "./index.module.scss";

const Card = ({
  size = "small",
  title,
  titleAlign = "center",
  position = "not-bottom",
  children,
  year,
  firstDropdownMenuItems,
  dropdownSecond,
  dropdownThird,
  handleDropdownFirstChange = () => {},
  handleDropdownSecondChange = () => {},
  handleDropdownThirdChange = () => {},
  handleYearChange = () => {},
  ...rest
}) => {
  const displayTitle = () => (
    <Box className={cn(styles.title, { [styles[titleAlign]]: titleAlign })}>
      {title}
    </Box>
  );
  return (
    <Box className={cn(styles.card, { [styles[size]]: size })} {...rest}>
      {position === "not-bottom" && displayTitle()}
      {(position === "left-bottom" || position === "right-bottom") && (
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item>{displayTitle()}</Grid>
          <Grid item>
            <SelectDropdown
              position={position}
              year={year}
              firstDropdownMenuItems={firstDropdownMenuItems}
              dropdownSecond={dropdownSecond}
              dropdownThird={dropdownThird}
              handleDropdownFirstChange={handleDropdownFirstChange}
              handleDropdownSecondChange={handleDropdownSecondChange}
              handleDropdownThirdChange={handleDropdownThirdChange}
              handleYearChange={handleYearChange}
            />
          </Grid>
        </Grid>
      )}
      {children}
    </Box>
  );
};

export default Card;
