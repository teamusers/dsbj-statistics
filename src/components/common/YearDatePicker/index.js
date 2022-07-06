import React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import styles from "./index.module.scss";

const YearDatePicker = ({ year, handleYearChange }) => {
  const color = "#fff";

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        views={["year"]}
        value={year}
        onChange={handleYearChange}
        InputProps={{
          classes: {
            root: styles.datePickerRoot,
            notchedOutline: styles.datePickerNotchedOutline,
          },
        }}
        renderInput={(params) => (
          <TextField
            classes={{
              root: styles.textFieldRoot,
            }}
            sx={{
              svg: { color },
              input: { color },
            }}
            {...params}
            helperText={null}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default YearDatePicker;
