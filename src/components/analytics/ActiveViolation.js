import { Grid } from "@material-ui/core";
import React from "react";
import ReactApexChart from "react-apexcharts";

function ActiveViolation() {
  const series = [
    {
      data: [400, 430, 448],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      width: "100%",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#f16230"],
    xaxis: {
      categories: [
        "Unresolved Violations",
        "Resolved Violations",
        "Total Violations",
      ],
    },
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
        width={"100%"}
        style={{ margin: "auto", width: "100%" }}
      />
    </>
  );
}

export default ActiveViolation;
