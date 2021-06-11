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

function ViolationType({ chartData, value, onChange, machineID, filter }) {
  const [series, setSeries] = React.useState([]);
  const [week, setWeek] = React.useState([]);

  React.useEffect(() => {
    if (chartData) {
      var CROWD = chartData?.crowdingData?.map((item) => item?.id);
      var FEED = chartData?.feedUnavailableData?.map((item) => item?.id);
      var WORKER = chartData?.workerUnavailableData?.map((item) => item?.id);

      const nums = [CROWD.length, FEED.length, WORKER.length];

      const ary = [
        "crowdingData",
        "feedUnavailableData",
        "workerUnavailableData",
      ];
      const max = Math.max(...nums);

      var WEEK2 = chartData?.[ary[nums.indexOf(max)]]?.map((item) =>
        new Date(item?.date).toISOString().slice(0, 10)
      );
      // console.log(WEEK2);

      var WEEK = chartData?.crowdingData?.map((item) =>
        new Date(item?.date).toISOString().slice(0, 10)
      );

      setWeek(WEEK2);
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

  // const series = [
  //   {
  //     name: "Feed UA",
  //     data: data?.crowdingData,
  //   },
  //   // {
  //   //   name: "Worker UA",
  //   //   data: [12, 11, 14, 18, 17, 13, 13],
  //   // },
  //   // {
  //   //   name: "Machine Downtime",
  //   //   data: [16, 19, 11, 13, 12, 10, 14],
  //   // },
  //   // {
  //   //   name: "Crowding",
  //   //   data: [32, 32, 33, 12, 11, 14, 18],
  //   // },
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
    colors: ["#77B6EA", "#545454", "#f16230", "#f68f1d"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    // title: {
    //   text: "Total violations by type.",
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
      type: "datetime",
      categories: week,
      title: {
        text: "Date",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      forceNiceScale: false,
      title: {
        text: "Number Of Violation Instances",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
      min: 0,
      max: 150,
    },
    legend: {
      //
      horizontalAlign: "center",
      position: "bottom",

      // offsetX: 40,
    },
  };

  return (
    <>
      <Grid container item xs={12} style={{ alignItems: "center" }}>
        <Grid container item xs={6} style={{ marginBottom: "16px" }}>
          <Typography variant="h6"> TOTAL VIOLATIONS BY TYPE</Typography>
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

export default ViolationType;
