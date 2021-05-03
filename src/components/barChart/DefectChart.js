import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
// import "./donutChart.css";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  //   fontSize: "12px",
  // },
  selectEmpty: {
    //   marginTop: theme.spacing(2),
  },
}));

function DefectChart() {
  const DATA = {
    series: [
      {
        name: "Defects",
        data: [65, 89, 38, 22, 50],
      },
    ],
    options: {
      chart: {
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      colors: ["#f68f1d"],
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200,
      //       },
      //       legend: {
      //         position: "bottom",
      //       },
      //     },
      //   },
      // ],

      xaxis: {
        categories: ["Damage", "Fray", "Miss", "Baffle", "Juki"],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: "Top 5 Defects",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        title: {
          text: "Count",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
    },
  };

  return (
    <>
      <div className="top">
        <Typography
          variant="h6"
          style={{ margin: "auto", textAlign: "center", color: "#f68f1d" }}
        >
          Defects %
        </Typography>
        <Typography
          variant="body1"
          style={{ margin: "auto", textAlign: "center", color: "#0e4a7b" }}
        >
          Top 5 Defects
        </Typography>
      </div>

      <div style={{ width: "100%" }}>
        <div className="chart">
          <Chart
            options={DATA.options}
            series={DATA.series}
            type="bar"
            height={200}
          />
        </div>
      </div>
      <Typography
        variant="h6"
        style={{ margin: "auto", textAlign: "center", color: "#f68f1d" }}
      >
        % Defective Bags{" "}
        <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>43%</span>
      </Typography>
    </>
  );
}

export default DefectChart;
