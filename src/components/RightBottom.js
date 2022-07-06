import React, { useState } from "react";
import ReactEcharts from "echarts-for-react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useQuery } from "react-query";

import { API_ENDPOINT, API_ENDPOINT_TEST } from "../utils/constant";
import Card from "./common/Card";

import styles from "./LeftRightBottom.module.scss";

// const transformed = {
//   title: "人效趋势图",
//   body: originData.reduce((acc, cur) => {
//     const yearNow = new Date().getFullYear();
//     const monthNow = new Date().getMonth();
//     const currentYear = cur.ds.slice(0, 4);
//     const initValues = [
//       ...Array(yearNow > currentYear ? 12 : monthNow + 1).fill(0),
//     ];

//     const currentBusinessUnit = cur.organization;
//     const isExisted = acc.find(
//       (item) =>
//         item.year === currentYear && item.business_unit === currentBusinessUnit
//     );

//     const currentMonthIndex = +cur.ds.slice(4) - 1;
//     const currentValue = +cur.average_amt_cny.toFixed();

//     if (!acc.length || !isExisted) {
//       initValues[currentMonthIndex] = currentValue;

//       const initData = {
//         business_unit: cur.organization,
//         year: currentYear,
//         category: [
//           {
//             type: "sales",
//             body: [
//               {
//                 name: `${cur.emp_subtype}人均销售额`,
//                 value: initValues,
//               },
//             ],
//           },
//         ],
//       };

//       acc.push(initData);
//     } else {
//       acc = acc.map((item) => {
//         if (
//           item.year === currentYear &&
//           item.business_unit === currentBusinessUnit
//         ) {
//           const subTypeFound = item.category[0].body.find(
//             (item) => item.name === `${cur.emp_subtype}人均销售额`
//           );

//           if (!subTypeFound) {
//             item.category[0].body.push({
//               name: `${cur.emp_subtype}人均销售额`,
//               value: initValues,
//             });
//           }

//           item.category[0].body = item.category[0].body.map((sub) => {
//             if (sub.name === `${cur.emp_subtype}人均销售额`) {
//               sub.value[currentMonthIndex] = currentValue;
//             }
//             return sub;
//           });
//         }

//         return item;
//       });
//     }

//     return acc;
//   }, []),
// };

const RightBottom = (props) => {
  const initialYear = new Date();
  const [year, setYear] = useState(initialYear);
  const [dropdownThird, setDropdownThird] = useState(2);
  const [graphOption, setGraphOption] = useState({});
  const [responseData, setResponseData] = useState({});

  const dropDownThirdInfo = [
    { name: "一线人均产值", type: "output" },
    { name: "二线人均产值", type: "output" },
    { name: "一线人均销售额", type: "sales" },
    { name: "二线人均销售额", type: "sales" },
  ];

  const handleYearChange = (value) => {
    if (value === null) {
      value = initialYear;
    }
    setYear(value);
  };

  const handleDropdownThirdChange = (event) => {
    setDropdownThird(event.target.value);
  };

  const formatGraphOption = (legends, xAxisLabels, formattedData) => {
    const colors = ["#ec0404", "#f25710", "#5e6fff", "#00a2ff", "#b857f5"];
    const option = {
      color: colors,
      title: {
        text: "",
      },
      tooltip: {
        trigger: "axis",
        valueFormatter: (value) => value.toFixed(2),
      },
      legend: {
        left: "left",
        textStyle: {
          fontSize: "16",
          color: "rgba(255, 255, 255, 255)",
        },
        data: legends,
        padding: [0, 0, 0, 28],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: xAxisLabels,
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
        name: "元",
        nameLocation: "end",
        nameTextStyle: {
          color: "#87919C",
          padding: [0, 30, 0, 0],
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
      series: formattedData,
    };
    setGraphOption(option);
  };

  const formatData = (datas) => {
    const legends = [];
    const formattedData = [];
    const xAxisLabels = [];
    let dataSize = 0;

    datas.body.forEach((data, dataIndex) => {
      const obj = {};
      const getByCategory = datas.body[dataIndex].category.filter(
        (category) => category.type === dropDownThirdInfo[dropdownThird].type
      );
      if (getByCategory[0] !== undefined) {
        const getByNames = getByCategory[0].body.filter(
          (body) => body.name === dropDownThirdInfo[dropdownThird].name
        );
        if (getByNames[0] !== undefined) {
          const graphData = getByNames[0];

          Object.assign(obj, {
            name: data.business_unit,
            type: "line",
            smooth: true,
            data: graphData.value,
          });

          if (graphData.value.length > dataSize) {
            dataSize = graphData.value.length;
          }

          legends.push(data.business_unit);
          formattedData.push(obj);
        }
      }
    });

    for (let x = 1; x <= dataSize; x += 1) {
      xAxisLabels.push(`${x}月`);
    }

    formatGraphOption(legends, xAxisLabels, formattedData);
  };

  const { isLoading, error } = useQuery(["rightBottom", {}], () => {
    const requestOptions = {
      method: "GET",
      headers: { year: year.getFullYear() },
    };
    fetch(
      `${
        window.location.hostname === "main.d20ta5mrr81qsv.amplifyapp.com"
          ? API_ENDPOINT_TEST
          : API_ENDPOINT
      }/yearly-employee-efficiency-trend`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setResponseData(data);
        formatData(data);
      });
  });

  useQuery(["rightBottom", { year, dropdownThird }], () => {
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
        title="人效趋势图"
        titleAlign="left"
        position="right-bottom"
        year={year}
        dropdownThird={dropdownThird}
        handleDropdownThirdChange={handleDropdownThirdChange}
        handleYearChange={handleYearChange}
      >
        <Box className={styles.graphContainer}>
          <ReactEcharts option={graphOption} />
        </Box>
      </Card>
    </Box>
  );
};

export default RightBottom;
