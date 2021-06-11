import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import ReactApexChart from "react-apexcharts";
import FilterListIcon from "@material-ui/icons/FilterList";

function Unresolved({ chartData, value, onChange, filter }) {
  const series = [
    chartData?.length > 0 ? chartData[0]?.count : 0,
    chartData?.length > 0 ? chartData[1]?.count : 0,
    chartData?.length > 0 ? chartData[2]?.count : 0,
  ];

  const options = {
    chart: {
      width: 380,
      type: "donut",
    },
    labels: [
      chartData?.length > 0 ? chartData[0]?.instance : "",
      chartData?.length > 0 ? chartData[1]?.instance : "",
      chartData?.length > 0 ? chartData[2]?.instance : "",
    ],
    colors: ["#094573", "#ffce38", "#ffa643", "#f16230"],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
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
      <Grid container item xs={12} style={{ alignItems: "center" }}>
        <Grid container item xs={6}>
          <Typography variant="h6"> MOST UNRESOLVED VIOLATIONS</Typography>
        </Grid>
        <Grid container item xs={4} style={{ marginBottom: "16px" }}>
          <FormControl
            variant="outlined"
            fullWidth
            // style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Supervisor
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={value}
              onChange={onChange}
              label="Supervisor"
              // multiple
            >
              {["Sanjay Dassamanta", "RP Yadav"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item className={"Grid_Padding"} md={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={filter}
          >
            <FilterListIcon />
          </Button>
        </Grid>
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={350}
          width={"100%"}
          style={{ margin: "auto", width: "100%" }}
        />
      </Grid>
    </>
    // <>
    // <ReactApexChart
    //   options={options}
    //   series={series}
    //   type="donut"
    //   height={350}
    //   width={"100%"}
    //   style={{ margin: "auto", width: "100%" }}
    // />
    // </>
  );
}

export default Unresolved;
