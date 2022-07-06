import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { graphic } from "echarts";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "react-query";

import Card from "./common/Card";
import { API_ENDPOINT, API_ENDPOINT_TEST } from "../utils/constant";

import styles from "./LeftRightBottom.module.scss";

import origin from "../utils/mockData/json_origin_transform/Left bottom/origin.json";

const LeftBottom = (props) => {
  const [dropdownFirst, setDropdownFirst] = useState(0);
  const [dropdownSecond, setDropdownSecond] = useState(2);
  const [graphOption, setGraphOption] = useState({});
  const [responseData, setResponseData] = useState({});

  const firstDropdownMenuItems = [
    "全部",
    "维信",
    "超毅",
    "LED",
    "触控",
    "精密",
  ];

  const dropDownSecondInfo = [
    {
      name: "一线人均产值及达成率",
      type: "output",
      grade: "1",
    },
    {
      name: "二线人均产值及达成率",
      type: "output",
      grade: "2",
    },
    {
      name: "一线人均销售额及达成率",
      type: "sales",
      grade: "1",
    },
    {
      name: "二线人均销售额及达成率",
      type: "sales",
      grade: "2",
    },
  ];

  const legendDatas = [
    ["一线人均产值", "一线人均达成率", "预算"],
    ["二线人均产值", "二线人均产值达成率", "预算"],
    ["一线人均销售额", "一线人均达成率", "预算"],
    ["二线人均销售额", "二线人均达成率", "预算"],
  ];

  /**
   * For the temporary removal of red legend
   * use const legendDatasTemp and replace the legendDatas
   * use const colors = ["#3291F8", "#FFB200"];
   * comment formattedData.push(obj2);
   * */
  // const legendDatasTemp = [
  //   ["一线人均产值", "预算"],
  //   ["二线人均产值", "预算"],
  //   ["一线人均销售额", "预算"],
  //   ["二线人均销售额", "预算"],
  // ];

  const seriesNames = [
    "一线人均产值",
    "二线人均产值",
    "一线人均销售额",
    "二线人均销售额",
  ];

  const secondSeriesNames = [
    "一线人均达成率",
    "二线人均产值达成率",
    "一线人均达成率",
    "二线人均达成率",
  ];

  const thirdSeriesName = "预算";

  const handleDropdownFirstChange = (event) => {
    setDropdownFirst(event.target.value);
  };

  const handleDropdownSecondChange = (event) => {
    setDropdownSecond(event.target.value);
  };

  const formatGraphOption = (
    leftYAxixMax,
    rightYAxisMax,
    xAxisLabels,
    formattedData
  ) => {
    const colors = ["#3291F8", "#ec0404", "#FFB200"];
    const option = {
      color: colors,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            color: "#000",
            formatter: (params) => {
              const formatValue =
                params.axisDimension === "y"
                  ? params.value.toFixed(2)
                  : params.value;
              return formatValue;
            },
          },
        },
        formatter: (params) => {
          const display = params.map((param) => {
            if (secondSeriesNames.includes(param.seriesName)) {
              // format if there is red legend
              return `${param.marker} ${
                param.seriesName
              }: <b>${param.value.toFixed(2)}%</b><br />`;
            } else {
              return `${param.marker} ${
                param.seriesName
              }: <b>${param.value.toFixed(2)}</b><br />`;
            }
          });

          const finalDisplay = `${params[0].name}<br />${display.join()}`;
          const formatFinalDisplay = finalDisplay.replace(/,/g, "");

          return formatFinalDisplay;
        },
        valueFormatter: (value) => value.toFixed(2),
      },
      grid: {
        height: "68%",
      },
      legend: {
        data: legendDatas[dropdownSecond],
        textStyle: {
          fontSize: "16",
          color: "rgba(255, 255, 255, 255)",
        },
        icon: "circle",
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
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
          data: xAxisLabels,
        },
      ],
      yAxis: [
        {
          type: "value",
          name: "元",
          nameTextStyle: {
            color: "#87919C",
            padding: [0, 30, 0, 0],
          },
          position: "left",
          alignTicks: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0],
            },
          },
          max: leftYAxixMax,
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
          interval: 20,
          nameTextStyle: {
            color: "#87919C",
            padding: [0, 0, 0, 50],
          },
          position: "right",
          alignTicks: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[1],
            },
          },
          max: rightYAxisMax,
          min: 0,
          axisLabel: {
            color: "#fff",
            formatter: (value) => {
              return `${value.toFixed(0)}%`;
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#283D74",
            },
          },
        },
      ],
      series: formattedData,
    };

    setGraphOption(option);
  };

  const formatData = (data) => {
    const formattedData = [];
    const xAxisLabels = [];
    let targetBudgets = [];
    let dataSize = 0;
    const obj = {};
    const obj2 = {};
    const obj3 = {};
    const defaultRightYAxisMax = 120;

    const getByBusinessUnit = data.organization.filter(
      (org) => org.business_unit === firstDropdownMenuItems[dropdownFirst]
    );

    if (getByBusinessUnit[0] !== undefined) {
      const getBySubType = getByBusinessUnit[0].subtype.filter(
        (businessUnit) =>
          businessUnit.type === dropDownSecondInfo[dropdownSecond].type
      );

      if (getBySubType[0] !== undefined) {
        const getByGrade = getBySubType[0].body.filter(
          (body) => body.grade === dropDownSecondInfo[dropdownSecond].grade
        );

        if (getByGrade[0] !== undefined) {
          const graphData = getByGrade[0];
          const percentage = graphData.percentage
            .map((item) => item.toFixed(2))
            .map(Number);
          const values = graphData.value
            .map((item) => parseFloat(item).toFixed(2))
            .map(Number);

          const getMaxValue = Math.max(...values);
          const maxValue = getMaxValue;
          const targetBudget = graphData.target_budget;
          const maxTargetBudget = targetBudget * (defaultRightYAxisMax / 100);

          const rightYAxisMax =
            maxValue > maxTargetBudget
              ? (maxValue / maxTargetBudget) * 100
              : defaultRightYAxisMax;
          const leftYAxixMax =
            maxValue > maxTargetBudget
              ? maxValue * (defaultRightYAxisMax / 100)
              : maxTargetBudget * (defaultRightYAxisMax / 100);

          // blue line object
          Object.assign(obj, {
            name: seriesNames[dropdownSecond],
            type: "line",
            showSymbol: true, // set to false to remove line symbol of blue legend
            emphasis: {
              focus: "series",
            },
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
            zlevel: 9,
            z: 9,
            data: values,
          });

          if (values.length > dataSize) {
            dataSize = values.length;
          }

          for (let x = 1; x <= dataSize; x += 1) {
            xAxisLabels.push(`${x}`);
            targetBudgets.push(targetBudget);
          }

          // red line object
          Object.assign(obj2, {
            name: secondSeriesNames[dropdownSecond],
            type: "line",
            yAxisIndex: 1,
            showSymbol: true, // set to false to remove line symbol of red legend
            emphasis: {
              focus: "series",
            },
            areaStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(236, 4, 4)",
                },
                {
                  offset: 1,
                  color: "rgb(9, 29, 90)",
                },
              ]),
            },
            zlevel: 9,
            z: 9,
            data: percentage,
          });

          // yellow line object
          Object.assign(obj3, {
            name: thirdSeriesName,
            type: "line",
            showSymbol: false, // set to false to remove line symbol of yellow legend
            emphasis: {
              focus: "series",
            },
            zlevel: 9,
            z: 9,
            markLine: {
              symbol: "none",
              lineStyle: {
                type: "solid",
                width: 2,
                color: "#FFB200",
              },
              label: {
                normal: {
                  show: false,
                },
              },
              data: [
                {
                  name: "Target budget",
                  yAxis: targetBudget,
                },
              ],
            },
            data: targetBudgets,
          });

          formattedData.push(obj);
          formattedData.push(obj2);
          formattedData.push(obj3);

          formatGraphOption(
            leftYAxixMax,
            rightYAxisMax,
            xAxisLabels,
            formattedData
          );
        }
      }
    }
  };

  /** JSON TRANSFROM START */
  // const getAllDaysInMonth = (year, month) => {
  //   const currDate = new Date();
  //   const currYear = currDate.getFullYear();
  //   const currMonth = currDate.getMonth();

  //   const startDate = new Date(year, month, 1);
  //   let endDate = new Date(year, month + 1, 0);
  //   if (year === currYear && month === currMonth) {
  //     endDate = new Date();
  //   }

  //   const dates = [];

  //   while (startDate.getMonth() === month && startDate <= endDate) {
  //     let local = new Date(startDate);
  //     local.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
  //     const formattedDate = local.toJSON().slice(0, 10);
  //     dates.push(formattedDate);
  //     startDate.setDate(startDate.getDate() + 1);
  //   }

  //   return dates;
  // };

  // const jsonTransform = () => {
  //   const transformedData = {};

  //   const formattedObj = {};
  //   const formattedOrgs = [];

  //   Object.assign(transformedData, {
  //     title: "当月累计达成率",
  //   });

  //   // YEAR AND MONTH SHOULD ALL BE THE SAME
  //   const date = new Date(origin[0].dt);
  //   const getDateList = getAllDaysInMonth(date.getFullYear(), date.getMonth());

  //   const groupByOrganization = origin.reduce((arr, data) => {
  //     let orgValue = data.organization.replace("事业部", "");
  //     if (arr[orgValue]) {
  //       arr[orgValue].push(data);
  //     } else {
  //       arr[orgValue] = [data];
  //     }
  //     return arr;
  //   }, {});

  //   for (const [orgKey, orgValue] of Object.entries(groupByOrganization)) {
  //     const tempOrgObj = {};
  //     const tempSubTypeArr = [];
  //     const tempSubTypeSalesObj = {};
  //     const tempBodyArr = [];

  //     const groupBySubType = orgValue.reduce((arr, data) => {
  //       let subType = `${data.emp_subtype}人均销售额`;
  //       if (arr[subType]) {
  //         arr[subType].push(data);
  //       } else {
  //         arr[subType] = [data];
  //       }
  //       return arr;
  //     }, {});

  //     let i = 1;
  //     for (const [subTypeKey, subTypeValue] of Object.entries(groupBySubType)) {
  //       const tempBodyObj = {};
  //       const tempValueArr = [];
  //       const tempPercentageArr = [];
  //       getDateList.forEach((dateData) => {
  //         const getSubTypeValue = subTypeValue.filter(
  //           (subTypeValueData) => subTypeValueData.dt === dateData
  //         );
  //         if (getSubTypeValue.length === 0) {
  //           tempValueArr.push("0");
  //           tempPercentageArr.push("0");
  //         } else {
  //           tempValueArr.push(
  //             parseFloat(getSubTypeValue[0].average_amt_cny).toFixed(2)
  //           );
  //           tempPercentageArr.push(
  //             parseFloat(getSubTypeValue[0].budget_rate).toFixed(2)
  //           );
  //         }
  //       });

  //       Object.assign(tempBodyObj, {
  //         grade: `${i}`,
  //         name: `${subTypeKey}`,
  //         target_budget: parseFloat(subTypeValue[0].budget),
  //         value: tempValueArr,
  //         percentage: tempPercentageArr,
  //       });
  //       tempBodyArr.push(tempBodyObj);
  //       i += 1;
  //     }

  //     Object.assign(tempSubTypeSalesObj, {
  //       type: `sales`,
  //       body: tempBodyArr,
  //     });

  //     tempSubTypeArr.push(tempSubTypeSalesObj);

  //     Object.assign(tempOrgObj, {
  //       business_unit: `${orgKey}`,
  //       subtype: tempSubTypeArr,
  //     });

  //     formattedOrgs.push(tempOrgObj);

  //     Object.assign(formattedObj, {
  //       title: "当月累计达成率",
  //       organization: formattedOrgs,
  //     });

  //     console.log("JSON TRANSFORM", formattedObj);
  //   }
  // };
  /** JSON TRANSFROM START */

  const { isLoading, error } = useQuery(["leftBottom", {}], () => {
    // jsonTransform();
    const requestOptions = {
      method: "GET",
      headers: { month: "June" },
    };
    fetch(
      `${
        window.location.hostname === "main.d20ta5mrr81qsv.amplifyapp.com"
          ? API_ENDPOINT_TEST
          : API_ENDPOINT
      }/monthly-cumulative-achievement-rate`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
        formatData(data);
      });
  });

  useQuery(["leftBottom", { dropdownFirst, dropdownSecond }], () => {
    formatData(responseData);
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }

  return (
    <Box {...props}>
      <Card
        size="large"
        title="当月累计达成率"
        titleAlign="left"
        position="left-bottom"
        firstDropdownMenuItems={firstDropdownMenuItems}
        dropdownSecond={dropdownSecond}
        handleDropdownFirstChange={handleDropdownFirstChange}
        handleDropdownSecondChange={handleDropdownSecondChange}
      >
        <Box className={styles.graphContainer}>
          <ReactEcharts option={graphOption} />
        </Box>
      </Card>
    </Box>
  );
};

export default LeftBottom;
