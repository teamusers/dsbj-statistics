import React from "react";
import { Box, Stack, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "react-query";

import { API_ENDPOINT, API_ENDPOINT_TEST } from "../utils/constant";
import Card from "./common/Card";
import Circle from "./common/Circle";

import styles from "./LeftTop.module.scss";

const LeftTop = (props) => {
  const { isLoading, error, data } = useQuery("leftTop", () =>
    fetch(
      `${
        window.location.hostname === "main.d20ta5mrr81qsv.amplifyapp.com"
          ? API_ENDPOINT_TEST
          : API_ENDPOINT
      }/monthly-budget`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const circleData = data?.category
    ? data.category
        .flat()
        .map((cat) => cat.body)
        .flat()
    : [];

  return (
    <Box {...props}>
      <Card size="small" title={data.title}>
        <Stack className={styles.content} px={2}>
          {circleData.length > 0 ? (
            circleData.map((item) => (
              <Circle
                key={item.name}
                value={item.value}
                description="万元"
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

export default LeftTop;
