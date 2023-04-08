import React, { useEffect } from "react";
import ReactECharts from "echarts-for-react";

const ExpectedReturnsChart = ({ rateData, amountData }) => {
  const getOption = () => {
    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#000000",
          },
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: rateData,
        name: "Fluc (%)",
      },
      yAxis: {
        type: "value",
        name: "Max Coverage (ETH)",
      },
      series: [
        {
          name: "Coverage",
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: amountData,
          emphasis: {
            focus: "series",
          },
          lineStyle: {
            width: 2,
          },
        },
      ],
    };
  };

  return (
    <ReactECharts
      option={getOption()}
      style={{ height: "350px", width: "100%" }}
      opts={{ renderer: "canvas" }}
    />
  );
};

export default ExpectedReturnsChart;
