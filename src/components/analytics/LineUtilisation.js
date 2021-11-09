import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import ReactApexChart from "react-apexcharts";
import "./Analytics.scss";

function LineUtilisation() {
  const series = [
    {
      name: "% Feed UA",
      data: [44, 55, 41, 64, 22, 43, 21],
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
    tooltip: {
      shared: false,
      intersect: false,
    },
    xaxis: {
      categories: [
        "Line 1",
        "Line 2",
        "Line 3",
        "Line 4",
        "Line 5",
        "Line 6",
        "Line 7",
      ],
      title: {
        text: "Line",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "% Of Utilisation",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
    },
    legend: {
      horizontalAlign: "center",
      position: "top",
    },
  };
  return (
    <>
      <Grid
        container
        item
        xs={12}
        style={{ alignItems: "center" }}
        className={"LineUtil"}
      >
        <Grid container item xs={6} style={{ marginBottom: "16px" }}>
          <Typography variant="h6"> LINE UTILISATION</Typography>
        </Grid>
        <Grid container item xs={6} style={{ marginBottom: "16px" }}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">
              Machine ID
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Machine ID"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {["Machine 1", "Machine 2", "Machine 3"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={360}
          width={"100%"}
          style={{ margin: "auto", width: "100%" }}
        />
      </Grid>
    </>
  );
}

export default LineUtilisation;
