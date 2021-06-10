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

function MachineLine({ chartData }) {
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

      var WEEK2 = chartData?.[ary[nums.indexOf(max)]]?.map((item) =>
        new Date(item?.timeInterval).toISOString().slice(0, 10)
      );

      var WEEK = chartData?.crowdingData?.map((item) =>
        new Date(item?.timeInterval).toISOString().slice(0, 10)
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
  //     data: [28, 29, 33, 36, 32, 32, 33],
  //   },
  //   {
  //     name: "Worker UA",
  //     data: [12, 11, 14, 18, 17, 13, 13],
  //   },
  //   {
  //     name: "Machine Breakdown",
  //     data: [16, 19, 11, 13, 12, 10, 14],
  //   },
  // ];

  const options = {
    chart: {
      height: 360,
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
      type: "date",
      categories: week,
      title: {
        text: "Time Interval",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "Duration (Mins)",
        style: {
          color: "#0e4a7b",
          fontSize: "14px",
          fontWeight: 400,
        },
      },
      min: 0,
      max: 400,
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
        <Grid container item xs={6} style={{ marginBottom: "16px" }}>
          <Typography variant="h6"> DURATION OF VIOLATIONS BY TYPE</Typography>
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

export default MachineLine;
