import { Grid } from "@material-ui/core";
import React from "react";
import ReactApexChart from "react-apexcharts";

function Unresolved() {
  const series = [44, 55, 41, 17];

  const options = {
    chart: {
      width: 380,
      type: "donut",
    },
    labels: ["Worker UA", "Feed UA", "Crowding", "Maching Breakdown"],

    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
    },
    legend: {
      formatter: function(val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      },
    },

    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={350}
        width={"100%"}
        style={{ margin: "auto", width: "100%" }}
      />
    </>
  );
}

export default Unresolved;
