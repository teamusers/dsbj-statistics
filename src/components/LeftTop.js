import React from "react";
import { Box, Stack } from "@mui/material";

import Card from "./common/Card";
import Circle1 from "./common/Circle1";

const LeftTop = (props) => (
  <Box {...props}>
    <Card size="small" title="本月预算">
      <Stack direction="row" justifyContent="center">
        <Circle1 value="9.30" description="万元" label="一线人均产值" />
        <Circle1 value="47.55" description="万元" label="二线人均产值" />
        <Circle1 value="9.30" description="万元" label="一线人均销售额" />
        <Circle1 value="47.55" description="万元" label="二线人均销售额" />
      </Stack>
    </Card>
  </Box>
);

export default LeftTop;
