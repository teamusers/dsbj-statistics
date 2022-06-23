import React from "react";
import { Box } from "@mui/material";

import Card from "./common/Card";

const LeftBottom = (props) => (
  <Box {...props}>
    <Card size="large" title="当月累计达成率" titleAlign="left">
      Haha
    </Card>
  </Box>
);

export default LeftBottom;
