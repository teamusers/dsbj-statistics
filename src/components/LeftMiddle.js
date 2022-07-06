import React from "react";
import { Box, Stack, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "react-query";

import { API_ENDPOINT, API_ENDPOINT_TEST } from "../utils/constant";
import Card from "./common/Card";
import Circular from "./common/Circular";

import styles from "./LeftMiddle.module.scss";

const COLOR_MAPPER = {
  0: "red",
  1: "yellow",
  2: "blue",
  3: "purple",
};

const LeftMiddle = (props) => {
  const { isLoading, error, data } = useQuery("leftMiddle", () =>
    fetch(
      `${
        window.location.hostname === "main.d20ta5mrr81qsv.amplifyapp.com"
          ? API_ENDPOINT_TEST
          : API_ENDPOINT
      }/monthly-achievement-rate`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const circularData = data?.category
    ? data.category
        .flat()
        .map((cat) => cat.body)
        .flat()
    : [];

  return (
    <Box {...props}>
      <Card size="small" title={data.title}>
        <Stack className={styles.content} mt={2} px={2}>
          {circularData.length > 0 ? (
            circularData.map((item, itemIndex) => (
              <Circular
                key={item.name}
                color={COLOR_MAPPER[itemIndex]}
                value={item.value}
                label={item.name}
              />
            ))
          ) : (
            <div>No data</div>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default LeftMiddle;
