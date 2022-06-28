import React from "react";
import { Grid, TextField, MenuItem } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import cn from "classnames";

import styles from "./index.module.scss";

const SelectDropdown = ({ position = "" }) => {
  const [dropdownFirst, setDropdownFirst] = React.useState(0);
  const [dropdownSecond, setDropdownSecond] = React.useState(0);
  const [dropdownThird, setDropdownThird] = React.useState(0);

  const menuItems = ["全部", "集团", "维信", "超毅", "LED", "触控", "精密"];
  const menuItemsClassNames = [
    "menu-0",
    "menu-1",
    "menu-2",
    "menu-3",
    "menu-4",
    "menu-5",
    "menu-6",
  ];

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
              {menuItems.map((menuItem, index) => {
                return (
                  <MenuItem
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
              <MenuItem value={0}>一线人均产值及达成率</MenuItem>
              <MenuItem value={1}>二线人均产值及达成率</MenuItem>
              <MenuItem value={2}>一线人均销售额及达成率</MenuItem>
              <MenuItem value={3}>二线人均销售额及达成率</MenuItem>
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
            <MenuItem value={0}>一线人均产值</MenuItem>
            <MenuItem value={1}>一线人均产值</MenuItem>
            <MenuItem value={2}>二线人均产值</MenuItem>
            <MenuItem value={3}>一线人均销售额</MenuItem>
            <MenuItem value={4}>二线人均销售额</MenuItem>
          </TextField>
        </Grid>
      )}
    </Grid>
  );
};

export default SelectDropdown;
