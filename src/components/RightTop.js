import React from "react";
import { Box, Stack, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "react-query";

import { API_ENDPOINT, API_ENDPOINT_TEST } from "../utils/constant";
import Card from "./common/Card";
import Progress from "./common/Progress";
import Number from "./common/Number";

import styles from "./RightTop.module.scss";

const RightTop = (props) => {
  const { isLoading, error, data } = useQuery("rightTop", () =>
    fetch(
      `${
        window.location.hostname === "main.d20ta5mrr81qsv.amplifyapp.com"
          ? API_ENDPOINT_TEST
          : API_ENDPOINT
      }/monthly-actual-per-capita-production-sales`
    ).then((res) => res.json())
  );

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  const dataApply = data?.category ?? [];

  return (
    <Box {...props}>
      <Card size="medium" title={data.title}>
        <Stack className={styles.content} my={2} px={2}>
          {dataApply[0]?.body[0] ? (
            <Progress
              color="blue"
              title={`${dataApply[0].body[0].name}（万元）`}
              percent={
                (dataApply[0].body[0].cur_value * 100) /
                dataApply[0].body[0].total_value
              }
              label={`${dataApply[0].body[0].total_value}万`}
            />
          ) : (
            <div>No data</div>
          )}
          {dataApply[1]?.body[0] ? (
            <Number
              title={dataApply[1].body[0].name}
              value={dataApply[1].body[0].value}
            />
          ) : (
            <div>No data</div>
          )}
          {dataApply[0]?.body[1] ? (
            <Progress
              color="red"
              title={`${dataApply[0].body[1].name}（万元）`}
              percent={
                (dataApply[0].body[1].cur_value * 100) /
                dataApply[0].body[1].total_value
              }
              label={`${dataApply[0].body[1].total_value}万`}
            />
          ) : (
            <div>No data</div>
          )}
          {dataApply[1]?.body[1] ? (
            <Number
              title={dataApply[1].body[1].name}
              value={dataApply[1].body[1].value}
            />
          ) : (
            <div>No data</div>
          )}
        </Stack>
      </Card>
    </Box>
  );
};

export default RightTop;
