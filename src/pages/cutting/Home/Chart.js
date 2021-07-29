import React, { useState } from "react";
import Chart from "react-apexcharts";
import "./Chart.css";

function Charts() {
  const [options, setOptions] = useState({
    chart: {
      type: "area",
      foreColor: "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      show: true,
      lineCap: "butt",
      colors: "#800000",
      width: 2,
      dashArray: 0,
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },

    fill: {
      colors: "#BF0000",
      opacity: 0.9,
      type: "solid",
      gradient: {
        shade: "#BF0000",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: "#800000",
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        colorStops: [],
      },
    },

    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        highlightDataSeries: false,
      },
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100, 48, 63, 41, 21, 77],
    },
  ]);

  return (
    <div>
      <div id="chart">
        <Chart options={options} series={series} type="area" height={200} />
      </div>
    </div>
  );
}

export default Charts;
