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

function ActiveViolation({ chartData }) {
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
        <Grid container item xs={6}>
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
              // multiple
              // value={inputMACHINEid}
              // onChange={(e) => setInputMACHINEid(e.target.value)}
              label="Supervisor"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {["Supervisor 1", "Supervisor 2", "Supervisor 3"].map(
                (item, index) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
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
