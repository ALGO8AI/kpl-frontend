import { Grid } from "@material-ui/core";
import React from "react";
import ReactApexChart from "react-apexcharts";

function MachineLine() {
  const series = [
    {
      name: "Feed UA",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Worker UA",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
    {
      name: "Machine Breakdown",
      data: [16, 19, 11, 13, 12, 10, 14],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ["#77B6EA", "#545454", "#f16230"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Duration By Type Of Violation",
      style: {
        color: "#0e4a7b",
        fontSize: "24px",
        fontWeight: 600,
      },
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8],
      title: {
        text: "Time Interval",
        style: {
          color: "#0e4a7b",
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "Amount Of Time",
        style: {
          color: "#0e4a7b",
          fontSize: "12px",
          fontWeight: 400,
        },
      },
      min: 5,
      max: 40,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
        width={"100%"}
        style={{ margin: "auto", width: "100%" }}
      />
    </>
  );
}

export default MachineLine;
