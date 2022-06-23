import React from "react";
import { Box, Stack } from "@mui/material";

import Card from "./common/Card";
import Progress from "./common/Progress";

const RightTop = (props) => (
  <Box {...props}>
    <Card size="medium" title="实际人均产销">
      <Stack direction="column" justifyContent="space-around" marginTop={2} px={2}>
        <Progress
          color="blue"
          title="一线人均产值（万元）"
          percent={70}
          label="12.8万"
        />
        <Progress
          color="red"
          title="二线人均产值（万元）"
          percent={90}
          label="32.3万"
        />
      </Stack>
    </Card>
  </Box>
);

export default RightTop;
