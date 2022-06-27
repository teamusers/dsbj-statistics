import React from "react";
import ReactEcharts from "echarts-for-react";
import { graphic } from "echarts";
import { Box } from "@mui/material";

import Card from "./common/Card";

import styles from "./LeftRightBottom.module.scss";

const colors = ["#3291F8", "#FFB200"];
const option = {
  color: colors,
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        color: "#000",
      },
    },
    valueFormatter: (value) => value.toFixed(0),
  },
  grid: {
    height: "68%",
  },
  // toolbox: {
  //   feature: {
  //     dataView: { show: true, readOnly: false },
  //     restore: { show: true },
  //     saveAsImage: { show: true },
  //   },
  // },
  legend: {
    data: ["二线人均产值", "二线人均产值达成率"],
    textStyle: {
      color: "rgba(255, 255, 255, 255)",
    },
    icon: "circle",
  },
  xAxis: [
    {
      type: "category",
      // name: "日期",
      // nameLocation: "center",
      nameTextStyle: {
        color: "#87919C",
        padding: [10, 0, 0, 0],
      },
      axisTick: {
        alignWithLabel: false,
      },
      axisLine: {
        lineStyle: {
          color: "#fff",
        },
      },
      axisLabel: {
        color: "#fff",
        margin: 16,
        interval: 0,
      },
      data: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
    },
  ],
  yAxis: [
    {
      type: "value",
      interval: 40,
      name: "万元",
      nameTextStyle: {
        color: "#87919C",
        padding: [0, 40, 0, 0],
      },
      position: "left",
      alignTicks: true,
      axisLine: {
        lineStyle: {
          color: colors[0],
        },
      },
      max: 320,
      min: 0,
      axisLabel: {
        color: "#fff",
        formatter: (value) => {
          return `${value.toFixed(0)}`;
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#283D74",
        },
      },
    },
    {
      type: "value",
      name: "达成率",
      interval: 40,
      nameTextStyle: {
        color: "#87919C",
        padding: [0, 0, 0, 50],
      },
      position: "right",
      alignTicks: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1],
        },
      },
      max: 120,
      min: 0,
      axisLabel: {
        color: "#fff",
        formatter: (value) => {
          return `${value.toFixed(0)}%`;
        },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#283D74",
        },
      },
    },
  ],
  series: [
    {
      name: "二线人均产值",
      type: "line",
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(50, 145, 248)",
          },
          {
            offset: 1,
            color: "rgb(9, 29, 90)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [
        120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120,
        132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 90, 230,
        210,
      ],
    },
    {
      name: "二线人均产值达成率",
      type: "line",
      areaStyle: {
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgb(255, 178, 0)",
          },
          {
            offset: 1,
            color: "rgb(9, 29, 90)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [
        220, 182, 191, 234, 290, 320, 310, 220, 182, 191, 234, 290, 320, 310,
        220, 182, 191, 234, 290, 320, 310, 220, 182, 191, 234, 290, 320, 310,
        290, 320, 310,
      ],
    },
  ],
};

const LeftBottom = (props) => {
  return (
    <Box {...props}>
      <Card
        size="large"
        title="当月累计达成率"
        titleAlign="left"
        position="left-bottom"
      >
        <Box className={styles.graphContainer}>
          <ReactEcharts option={option} />
        </Box>
      </Card>
    </Box>
  );
};

export default LeftBottom;
