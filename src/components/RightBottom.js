import React from "react";
import ReactEcharts from "echarts-for-react";
import { Box } from "@mui/material";

import Card from "./common/Card";

import styles from "./LeftRightBottom.module.scss";

const colors = [
  "#ffb200",
  "#ec0404",
  "#f25710",
  "#5e6fff",
  "#00a2ff",
  "#b857f5",
];
const option = {
  color: colors,
  title: {
    text: "",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    left: "left",
    textStyle: {
      color: "rgba(255, 255, 255, 255)",
    },
    data: ["集团", "维信", "超毅", "LED", "触控", "精密"],
    padding: [0, 0, 0, 28],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  // toolbox: {
  //   feature: {
  //     saveAsImage: {},
  //   },
  // },
  xAxis: {
    type: "category",
    // boundaryGap: false,
    // name: "月份",
    data: ["1月", "2月", "3月", "4月", "5月", "6月"],
    axisLine: {
      lineStyle: {
        color: "#fff",
      },
    },
    axisLabel: {
      color: "#fff",
      margin: 16,
    },
    nameLocation: "center",
    nameTextStyle: {
      color: "#87919C",
      // padding: [10, 0, 0, 0],
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#283D74",
      },
    },
  },
  yAxis: {
    type: "value",
    name: "万元",
    nameLocation: "end",
    nameTextStyle: {
      color: "#87919C",
      padding: [0, 40, 0, 0],
    },
    axisLabel: {
      color: "#fff",
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#283D74",
      },
    },
  },
  series: [
    {
      name: "集团",
      type: "line",
      smooth: true,
      // lineStyle: { color: "#ff0" },
      data: [120, 132, 101, 134, 90, 230],
    },
    {
      name: "维信",
      type: "line",
      smooth: true,
      data: [220, 182, 191, 234, 290, 330],
    },
    {
      name: "超毅",
      type: "line",
      smooth: true,
      data: [150, 232, 201, 154, 190, 330],
    },
    {
      name: "LED",
      type: "line",
      smooth: true,
      data: [320, 332, 301, 334, 390, 330],
    },
    {
      name: "触控",
      type: "line",
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330],
    },
    {
      name: "精密",
      type: "line",
      smooth: true,
      data: [820, 932, 901, 934, 1290, 1330],
    },
  ],
};

const RightBottom = (props) => {
  return (
    <Box {...props}>
      <Card
        size="large"
        title="人效趋势图"
        titleAlign="left"
        position="right-bottom"
      >
        <Box className={styles.graphContainer}>
          <ReactEcharts option={option} />
        </Box>
      </Card>
    </Box>
  );
};

export default RightBottom;
