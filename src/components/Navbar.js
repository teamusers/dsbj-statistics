import React from "react";
import { Box, Stack } from "@mui/material";

import Button from "./common/Button";

import styles from "./Navbar.module.scss";

const NavBar = () => (
  <Box className={styles.container}>
    <Box className={styles.left}>
      <Stack className={styles.navLeft} direction="row" spacing={1.5}>
        <Button side="left">首页</Button>
        <Button side="left" active={true}>人事</Button>
        <Button side="left">销售</Button>
      </Stack>
    </Box>
    <Box className={styles.middle}>集团大数据仪表盘-人事</Box>
    <Box className={styles.right}>
      <Stack className={styles.navRight} direction="row" spacing={1.5}>
        <Button side="right">采购</Button>
        <Button side="right">库存</Button>
        <Button side="right">产出</Button>
      </Stack>
    </Box>
  </Box>
);

export default NavBar;
