import React, { useState } from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import YearDatePicker from "../YearDatePicker";

import cn from "classnames";

import styles from "./index.module.scss";

const SelectDropdown = ({
  position = "",
  year,
  firstDropdownMenuItems,
  dropdownSecond,
  dropdownThird,
  handleDropdownFirstChange,
  handleDropdownSecondChange,
  handleDropdownThirdChange,
  handleYearChange,
}) => {
  const [dropdownFirst, setDropdownFirst] = useState(0);

  const menuItemsClassNames = [
    "menu-0",
    "menu-1",
    "menu-2",
    "menu-3",
    "menu-4",
    "menu-5",
  ];

  const dropdownFirstChange = (event) => {
    setDropdownFirst(event.target.value);
    handleDropdownFirstChange(event);
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
              onChange={dropdownFirstChange}
              select
              SelectProps={{
                classes: {
                  icon: cn(styles.selectIcon, {
                    [styles[menuItemsClassNames[dropdownFirst]]]:
                      menuItemsClassNames[dropdownFirst],
                  }),
                },
                IconComponent: (defaultProps) => (
                  <KeyboardArrowDownIcon {...defaultProps} />
                ),
                MenuProps: {
                  classes: {
                    root: styles.menuRoot,
                  },
                },
              }}
              InputProps={{
                classes: {
                  root: cn(styles.inputRoot, {
                    [styles["small"]]: "small",
                    [styles[menuItemsClassNames[dropdownFirst]]]:
                      menuItemsClassNames[dropdownFirst],
                  }),
                  notchedOutline: styles.inputNotchedOutline,
                },
              }}
            >
              {firstDropdownMenuItems.map((menuItem, index) => {
                return (
                  <MenuItem
                    key={menuItem}
                    classes={{
                      root: cn(styles.menuItem, {
                        [styles[menuItemsClassNames[index]]]:
                          menuItemsClassNames[index],
                      }),
                      selected: cn(styles.menuSelected, {
                        [styles[menuItemsClassNames[dropdownFirst]]]:
                          menuItemsClassNames[dropdownFirst],
                      }),
                    }}
                    value={index}
                  >
                    ● {menuItem}
                  </MenuItem>
                );
              })}
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
              {/* <MenuItem value={0}>一线人均产值及达成率</MenuItem>
              <MenuItem value={1}>二线人均产值及达成率</MenuItem> */}
              <MenuItem value={2}>一线人均销售额及达成率</MenuItem>
              <MenuItem value={3}>二线人均销售额及达成率</MenuItem>
            </TextField>
          </Grid>
        </>
      )}
      {position === "right-bottom" && (
        <>
          {/* <Grid item>
            <YearDatePicker year={year} handleYearChange={handleYearChange} />
          </Grid> */}
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
              {/* <MenuItem value={0}>一线人均产值</MenuItem>
              <MenuItem value={1}>二线人均产值</MenuItem> */}
              <MenuItem value={2}>一线人均销售额</MenuItem>
              <MenuItem value={3}>二线人均销售额</MenuItem>
            </TextField>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default SelectDropdown;
