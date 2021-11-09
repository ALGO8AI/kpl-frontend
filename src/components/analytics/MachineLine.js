import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import ReactApexChart from "react-apexcharts";
import FilterListIcon from "@material-ui/icons/FilterList";

function MachineLine({
  chartData,
  value,
  onChange,
  machineID,
  filter,
  currentDate,
  setCurrentDate,
  shiftValue,
  setShiftValue,
}) {
  const [series, setSeries] = React.useState([]);
  const [week, setWeek] = React.useState([]);

  React.useEffect(() => {
    if (chartData) {
      var CROWD = chartData?.crowdingData?.map((item) => item?.duration);
      var FEED = chartData?.feedUnavailableData?.map((item) => item?.duration);
      var WORKER = chartData?.workerUnavailableData?.map(
        (item) => item?.duration
      );

      const nums = [CROWD.length, FEED.length, WORKER.length];

      const ary = [
        "crowdingData",
        "feedUnavailableData",
        "workerUnavailableData",
      ];
      const max = Math.max(...nums);
      var WEEK = chartData?.[ary[nums.indexOf(max)]]?.map(
        (item) => item?.timeInterval
      );

      setWeek(WEEK);
      setSeries([
        {
          name: "Crowding Data",
          data: CROWD,
        },
        {
          name: "Feed Unavailable",
          data: FEED,
        },
        {
          name: "WorkerUnavailable",
          data: WORKER,
        },
      ]);
    }
  }, [chartData]);

  const options = {
    chart: {
      type: "line",
      dropShadow: {
        enabled: false,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: true,
      },
      toolbar: {
        show: true,
      },
    },
    colors: ["#77B6EA", "#545454", "#f16230"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },

    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      labels: {
        rotate: 0,
      },
      type: "time",
      categories: week,
      title: {
        text: "Time (Hrs.)",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "Duration (Min.)",
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
      <Grid container item xs={12} style={{ alignItems: "center" }}>
        <Grid container item xs={12} md={4} style={{ marginBottom: "16px" }}>
          <Typography variant="h6"> DURATION OF VIOLATIONS BY TYPE</Typography>
        </Grid>
        <Grid container item xs={6} md={2} style={{ marginBottom: "16px" }}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ margin: "0px 10px" }}
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
            >
              {machineID?.length > 0 &&
                machineID.map((item, index) => (
                  <MenuItem value={item.machineID} key={index}>
                    {item.machineID}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid container item xs={6} md={2} style={{ marginBottom: "16px" }}>
          <FormControl
            variant="outlined"
            fullWidth
            style={{ margin: "0px 10px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Shift
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              multiple
              value={shiftValue}
              onChange={setShiftValue}
              label="Shift"
            >
              {["A", "B"].map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid container item style={{ marginBottom: "16px" }} xs={6} md={2}>
          <TextField
            key="from"
            id="fromDate"
            label="Current Date"
            value={currentDate}
            type="date"
            style={{ margin: "0px 10px" }}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={setCurrentDate}
            fullWidth
          />
        </Grid>
        <Grid container item style={{ marginBottom: "16px" }} xs={6} md={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "0 10px" }}
            onClick={filter}
          >
            <FilterListIcon />
          </Button>
        </Grid>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={420}
          width={"100%"}
          style={{ margin: "auto", width: "100%" }}
        />
      </Grid>
    </>
  );
}

export default MachineLine;
