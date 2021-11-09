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

function MachineStatus({
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
  const [week, setWeek] = React.useState([1, 2, 3, 4, 5, 6, 7]);

  React.useEffect(() => {
    if (chartData) {
      var Orsan6 = chartData
        ?.filter((item) => item?.machineId === "FG2/U+2/Orsan6")
        .map((item) => item?.timeDuration);
      var Orsan5 = chartData
        ?.filter((item) => item?.machineId === "FG2/U+2/Orsan5")
        .map((item) => item?.timeDuration);
      var Orsan4 = chartData
        ?.filter((item) => item?.machineId === "FG2/U+2/Orsan4")
        .map((item) => item?.timeDuration);
      var Top3 = chartData
        ?.filter((item) => item?.machineId === "FG2/U+2/Top3")
        .map((item) => item?.timeDuration);

      const nums = [Orsan6.length, Orsan5.length, Orsan4.length, Top3.length];

      const ary = [
        "FG2/U+2/Orsan6",
        "FG2/U+2/Orsan5",
        "FG2/U+2/Orsan4",
        "FG2/U+2/Top3",
      ];
      const max = Math.max(...nums);

      var WEEK1 = chartData
        ?.filter((item) => item?.machineId === ary[nums.indexOf(max)])
        .map((item) => item.timeInterval);

      setWeek(WEEK1);
      setSeries([
        {
          name: "Orsan6",
          data: Orsan6,
        },
        {
          name: "Orsan5",
          data: Orsan5,
        },
        {
          name: "Orsan4",
          data: Orsan4,
        },
        {
          name: "Top3",
          data: Top3,
        },
      ]);
    }
  }, [chartData]);

  const options = {
    chart: {
      height: 350,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
      },
    },
    colors: ["#77B6EA", "#545454", "#f16230", "#ffce38"],
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
        rotate: -90,
      },
      type: "category",
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
        text: "Time Duration (Min.)",
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
          <Typography variant="h6"> MACHINE STATUS</Typography>
        </Grid>
        <Grid container item xs={6} md={2} style={{ marginBottom: "16px" }}>
          <FormControl variant="outlined" fullWidth>
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
        <Grid container item className={"Grid_Padding"} xs={6} md={2}>
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
          type="line"
          height={360}
          width={"100%"}
          style={{ margin: "auto", width: "100%" }}
        />
      </Grid>
    </>
  );
}

export default MachineStatus;
