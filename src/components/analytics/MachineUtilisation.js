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

function MachineUtilisation({ chartData, value, onChange, machineID, filter }) {
  const [series, setSeries] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  React.useEffect(() => {
    if (chartData) {
      setSeries([
        {
          name: "Scheduled (Hrs.)",

          data: [
            chartData[0]?.scheduledHours,
            chartData[1]?.scheduledHours,
            chartData[2]?.scheduledHours,
            chartData[3]?.scheduledHours,
            chartData[4]?.scheduledHours,
          ],
        },
        {
          name: "Worker UA (Hrs.)",

          data: [
            chartData[0]?.WorkerUnavailableHours,
            chartData[1]?.WorkerUnavailableHours,
            chartData[2]?.WorkerUnavailableHours,
            chartData[3]?.WorkerUnavailableHours,
            chartData[4]?.WorkerUnavailableHours,
          ],
        },
        {
          name: "Feed UA (Hrs.)",

          data: [
            chartData[0]?.feedUnavailableHours,
            chartData[1]?.feedUnavailableHours,
            chartData[2]?.feedUnavailableHours,
            chartData[3]?.feedUnavailableHours,
            chartData[4]?.feedUnavailableHours,
          ],
        },
        {
          name: "Machine Off (Hrs.)",

          data: [
            chartData[0]?.machineOffTime,
            chartData[1]?.machineOffTime,
            chartData[2]?.machineOffTime,
            chartData[3]?.machineOffTime,
            chartData[4]?.machineOffTime,
          ],
        },
      ]);

      setCategory([
        chartData[0]?.machineID,
        chartData[1]?.machineID,
        chartData[2]?.machineID,
        chartData[3]?.machineID,
        chartData[4]?.machineID,
      ]);
    }
  }, [chartData]);

  // const series = [
  //   {
  //     name: "% Feed UA",
  //     data: [44, 55, 41, 64, 22, 43, 21],
  //   },
  //   {
  //     name: "% Worker UA",
  //     data: [53, 32, 33, 52, 13, 44, 32],
  //   },
  //   {
  //     name: "% Machine Breakdown",
  //     data: [16, 19, 11, 13, 12, 10, 14],
  //   },
  // ];
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
      offsetY: -20,
      style: {
        fontSize: "14px",
        colors: ["#000"],
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
      categories: category,
      title: {
        text: "Machine ID",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "Duration Of Violation",
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
        <Grid container item xs={4} style={{ marginBottom: "16px" }}>
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
              multiple
              value={value}
              onChange={onChange}
              label="Machine ID"
              // multiple
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {machineID?.length > 0 &&
                machineID.map((item, index) => (
                  <MenuItem value={item.machineID} key={index}>
                    {item.machineID}
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

export default MachineUtilisation;
