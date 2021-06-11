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
import FilterListIcon from "@material-ui/icons/FilterList";
import ReactApexChart from "react-apexcharts";

function ActiveViolation({ chartData, value, onChange, filter }) {
  const series = [
    {
      data: [
        chartData?.length > 0 ? chartData[0]?.count : 0,
        chartData?.length > 0 ? chartData[1]?.count : 0,
        chartData?.length > 0 ? chartData[0]?.count + chartData[1]?.count : 0,
      ],
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
      <Grid container item xs={12} style={{ alignItems: "center" }}>
        <Grid container item xs={6}>
          <Typography variant="h6"> TOTAL VIOLATIONS</Typography>
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
          type="bar"
          height={350}
          width={"100%"}
          style={{ margin: "auto", width: "100%" }}
        />
      </Grid>
    </>
  );
}

export default ActiveViolation;
