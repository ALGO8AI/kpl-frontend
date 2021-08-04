import { Grid, Typography, Paper } from "@material-ui/core";
import React from "react";
import Chart from "react-apexcharts";

function Defect() {
  const DATA = {
    series: [
      {
        name: "Defects",
        data: [4, 6, 3, 8, 1],
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
      colors: ["#0e4a7b"],
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
        categories: ["Def 1", "Def 2", "Def 3", "Def 4", "Def 5"],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        title: {
          text: "Type of defects",
          style: {
            color: "#0e4a7b",
            fontSize: "12px",
            fontWeight: 400,
          },
        },
      },
      yaxis: {
        title: {
          text: "No. of defects",
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
    <Grid container item xs={12} component={Paper} elevation={3}>
      <h3
        style={{
          backgroundColor: "#f68f1d",
          width: "min-content",
          whiteSpace: "nowrap",
          padding: "8px 12px",
          margin: "auto",
          color: "white",
          fontWeight: "500",
          borderRadius: "4px",
          marginTop: "12px",
        }}
      >
        Top 5 Defects
      </h3>
      <Chart
        options={DATA.options}
        series={DATA.series}
        type="bar"
        height={300}
      />
    </Grid>
  );
}

export default Defect;
