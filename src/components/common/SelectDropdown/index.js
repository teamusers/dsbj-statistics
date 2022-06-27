import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import cn from "classnames";

import styles from "./index.module.scss";

const SelectDropdown = ({ position = "" }) => {
  const [dropdownFirst, setDropdownFirst] = React.useState(1);
  const [dropdownSecond, setDropdownSecond] = React.useState(1);
  const [dropdownThird, setDropdownThird] = React.useState(1);

  const handleDropdownFirstChange = (event) => {
    setDropdownFirst(event.target.value);
  };

  const handleDropdownSecondChange = (event) => {
    setDropdownSecond(event.target.value);
  };

  const handleDropdownThirdChange = (event) => {
    setDropdownThird(event.target.value);
  };

  return (
    <Grid
      className={styles.dropdownContainer}
      container
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      {position === "left-bottom" && (
        <>
          <Grid item>
            <TextField
              value={dropdownFirst}
              onChange={handleDropdownFirstChange}
              select
              SelectProps={{
                classes: { icon: styles.selectIcon },
                IconComponent: (defaultProps) => (
                  <KeyboardArrowDownIcon {...defaultProps} />
                ),
                MenuProps: {
                  classes: {
                    root: styles.menuRoot,
                    selected: styles.menuSelected,
                  },
                },
              }}
              InputProps={{
                classes: {
                  root: cn(styles.inputRoot, {
                    [styles["small"]]: "small",
                  }),
                  notchedOutline: styles.inputNotchedOutline,
                },
              }}
            >
              <MenuItem value={1}>● 全部</MenuItem>
              <MenuItem value={2}>● 集团</MenuItem>
              <MenuItem value={3}>● 维信</MenuItem>
              <MenuItem value={4}>● 超毅</MenuItem>
              <MenuItem value={5}>● LED</MenuItem>
              <MenuItem value={6}>● 触控</MenuItem>
              <MenuItem value={7}>● 精密</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              value={dropdownSecond}
              onChange={handleDropdownSecondChange}
              select
              SelectProps={{
                classes: { icon: styles.selectIcon },
                IconComponent: (defaultProps) => (
                  <KeyboardArrowDownIcon {...defaultProps} />
                ),
              }}
              InputProps={{
                classes: {
                  root: cn(styles.inputRoot, {
                    [styles["large"]]: "large",
                  }),
                  notchedOutline: styles.inputNotchedOutline,
                },
              }}
            >
              <MenuItem value={1}>一线人均产值及达成率</MenuItem>
              <MenuItem value={2}>二线人均产值及达成率</MenuItem>
              <MenuItem value={3}>一线人均销售额及达成率</MenuItem>
              <MenuItem value={4}>二线人均销售额及达成率</MenuItem>
            </TextField>
          </Grid>
        </>
      )}
      {position === "right-bottom" && (
        <Grid item>
          <TextField
            value={dropdownThird}
            onChange={handleDropdownThirdChange}
            select
            SelectProps={{
              classes: { icon: styles.selectIcon },
              IconComponent: (defaultProps) => (
                <KeyboardArrowDownIcon {...defaultProps} />
              ),
            }}
            InputProps={{
              classes: {
                root: cn(styles.inputRoot, {
                  [styles["medium"]]: "medium",
                }),
                notchedOutline: styles.inputNotchedOutline,
              },
            }}
          >
            <MenuItem value={1}>一线人均产值</MenuItem>
            <MenuItem value={2}>一线人均产值</MenuItem>
            <MenuItem value={3}>二线人均产值</MenuItem>
            <MenuItem value={4}>一线人均销售额</MenuItem>
            <MenuItem value={5}>二线人均销售额</MenuItem>
          </TextField>
        </Grid>
      )}
    </Grid>
  );
};

export default SelectDropdown;
