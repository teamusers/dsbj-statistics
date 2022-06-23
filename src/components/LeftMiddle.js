import React from "react";
import { Box, Stack } from "@mui/material";

import Card from "./common/Card";
import Circle from "./common/Circle";

const LeftMiddle = (props) => (
  <Box {...props}>
    <Card size="small" title="达成率">
      <Stack direction="row" justifyContent="space-around" marginTop={2} px={2}>
        <Circle color="red" value="78%" label="一线人均产值" />
        <Circle color="yellow" value="82%" label="二线人均产值" />
        <Circle color="blue" value="95%" label="一线人均销售额" />
        <Circle color="purple" value="101%" label="二线人均销售额" />
      </Stack>
    </Card>
  </Box>
);

export default LeftMiddle;
