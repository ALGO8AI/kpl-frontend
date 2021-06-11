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
      // console.log(chartData);
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
      // var WEEK = ary[nums.indexOf(max)]?.map((item) =>
      //   new Date(item?.timeInterval).toISOString().slice(0, 10)
      // );
      var WEEK1 = chartData
        ?.filter((item) => item?.machineId === ary[nums.indexOf(max)])
        .map((item) => item.timeInterval);

      // console.log(WEEK1);

      setWeek(WEEK1);
      // console.log(Orsan6, Orsan5, Orsan4, Top3);
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

  // const series = [
  //   {
  //     name: "On",
  //     data: [28, 29, 33, 36, 32, 32, 33],
  //   },
  //   {
  //     name: "Off",
  //     data: [12, 11, 14, 18, 17, 13, 13],
  //   },
  //   {
  //     name: "Machine Breakdown",
  //     data: [16, 19, 11, 13, 12, 10, 14],
  //   },
  // ];

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
    // title: {
    //   text: "Duration By Type Of Violation",
    //   style: {
    //     color: "#0e4a7b",
    //     fontSize: "24px",
    //     fontWeight: 600,
    //   },
    //   align: "left",
    // },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
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
      // min: 0,
      // max: 500,
    },
    legend: {
      // position: "top",
      // horizontalAlign: "right",
      // floating: true,
      // offsetY: -25,
      // offsetX: -5,
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
              // multiple
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
    // <>
    // <ReactApexChart
    //   options={options}
    //   series={series}
    //   type="line"
    //   height={350}
    //   width={"100%"}
    //   style={{ margin: "auto", width: "100%" }}
    // />
    // </>
  );
}

export default MachineStatus;