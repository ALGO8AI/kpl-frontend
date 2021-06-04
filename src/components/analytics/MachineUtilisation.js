import React from "react";
import ReactApexChart from "react-apexcharts";

function MachineUtilisation() {
  const series = [
    {
      name: "% Feed UA",
      data: [44, 55, 41, 64, 22, 43, 21],
    },
    {
      name: "% Worker UA",
      data: [53, 32, 33, 52, 13, 44, 32],
    },
    {
      name: "% Machine Breakdown",
      data: [16, 19, 11, 13, 12, 10, 14],
    },
  ];
  const options = {
    chart: {
      type: "bar",
      height: 430,
    },
    colors: ["#77B6EA", "#545454", "#f16230"],
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: 0,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Machine Utilisation",
      style: {
        color: "#0e4a7b",
        fontSize: "24px",
        fontWeight: 600,
      },
      align: "left",
    },
    tooltip: {
      shared: false,
      intersect: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5],
      title: {
        text: "Machine ID",
        style: {
          color: "#0e4a7b",
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "% Of Violation",
        style: {
          color: "#0e4a7b",
          fontSize: "12px",
          fontWeight: 400,
        },
      },
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

export default MachineUtilisation;
