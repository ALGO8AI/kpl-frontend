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

function LineUtilisation() {
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
    // title: {
    //   text: "Machine Utilisation",
    //   style: {
    //     color: "#0e4a7b",
    //     fontSize: "24px",
    //     fontWeight: 600,
    //   },
    //   align: "left",
    // },
    tooltip: {
      shared: false,
      intersect: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5],
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
        text: "% Of Violation",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
    },
    legend: {
      //
      horizontalAlign: "center",
      position: "top",

      // offsetX: 40,
    },
  };
  return (
    <>
      <Grid container item xs={12} style={{ alignItems: "center" }}>
        <Grid container item xs={6} style={{ marginBottom: "16px" }}>
          <Typography variant="h6"> MACHINE UTILISATION</Typography>
        </Grid>
        <Grid container item xs={6} style={{ marginBottom: "16px" }}>
          <FormControl
            variant="outlined"
            fullWidth
            // style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Machine ID
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              // multiple
              // value={inputMACHINEid}
              // onChange={(e) => setInputMACHINEid(e.target.value)}
              label="Machine ID"
              // multiple
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
    // <>
    // <ReactApexChart
    //   options={options}
    //   series={series}
    //   type="bar"
    //   height={360}
    //   width={"100%"}
    //   style={{ margin: "auto", width: "100%" }}
    // />
    // </>
  );
}

export default LineUtilisation;
