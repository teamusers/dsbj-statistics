import React from "react";
import { Box, Stack } from "@mui/material";

import Card from "./common/Card";
import Circle from "./common/Circle";

const LeftTop = (props) => (
  <Box {...props}>
    <Card size="small" title="本月预算">
      <Stack direction="row" justifyContent="space-around" px={2}>
        <Circle value="9.30" description="万元" label="一线人均产值" />
        <Circle value="47.55" description="万元" label="二线人均产值" />
        <Circle value="9.30" description="万元" label="一线人均销售额" />
        <Circle value="47.55" description="万元" label="二线人均销售额" />
      </Stack>
    </Card>
  </Box>
);

export default LeftTop;
