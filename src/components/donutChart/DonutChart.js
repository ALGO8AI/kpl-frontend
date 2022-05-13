/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./DonutChart.scss";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StitchingContext } from "../../context/StitchingContext";

const useStyles = makeStyles((theme) => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  //   fontSize: "12px",
  // },
  selectEmpty: {
    //   marginTop: theme.spacing(2),
  },
}));

function DonutChart(props) {
  const { dispatch } = React.useContext(StitchingContext);

  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const [options, setOptions] = useState({
    chart: {
      type: "donut",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
        },
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#094573", "#ffce38", "#ffa643", "#f16230"],
    labels: ["Total working hours", "Worker Unavailable", "Balance Hours"],

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
            name: {
              show: true,
              color: "#333",
              fontSize: "14px",
            },
            value: {
              show: true,
              color: "#333",
              fontSize: "14px",
            },
          },
        },
      },
    },

    legend: {
      show: false,
      labels: {
        colors: ["#094573", "#ffce38", "#ffa643", "#f16230"],
        useSeriesColors: false,
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
  });
  const [week, setWeek] = useState();

  useEffect(() => {
    var d = new Date();
    var d1 = new Date();
    var dateIndex = d.getDay();
    d.setDate(d.getDate() - dateIndex + 1);
    // d1.setDate(d1.getDate()+(7-dateIndex))
    var st = d.toLocaleString().split("/");
    var st1 = d1.toLocaleString().split("/");

    var startDate = (st[1] + "/" + st[0] + "/" + st[2]).split(",");
    var endDate = (st1[1] + "/" + st1[0] + "/" + st1[2]).split(",");

    setWeek(startDate[0] + "-" + endDate[0]);
    // console.log(props);
  }, []);

  const SERIES = [
    props.totalTime -
      (props.idleDueToWorkerUnavailable +
        props.feedUnavailibilityDuration +
        props.other),
    props.idleDueToWorkerUnavailable,
    props.feedUnavailibilityDuration,
    props.other,
  ];
  const SERIES2 = [100, 50, 25, 12.5];

  return (
    <>
      <div className="top" style={{ display: "flex", marginBottom: "12px" }}>
        <Typography
          // variant="h5"
          style={{
            margin: "auto",
            textAlign: "center",
            backgroundColor: "#f68f1d",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "20px",
            fontWeight: "500",
          }}
          component={Link}
          to={props.link}
          onClick={() =>
            dispatch({ type: "VIOLATION_TAB", payload: props.payload_data })
          }
        >
          Worker Availability
        </Typography>
      </div>
      <div className="donutCard">
        <div className="leftTile">
          <div className="chart">
            <Chart
              options={options}
              series={[
                Boolean(props.totalTime) ? props.totalTime : 0,
                Boolean(props.idleDueToWorkerUnavailable)
                  ? props.idleDueToWorkerUnavailable
                  : 0,

                Boolean(props.other) ? +props.other : 0,
              ]}
              type="donut"
            />
            {/* <p>
            % Actual Working Hour{" "}
            {Math.round(
              (props.totalTime -
                props.idleDueToWorkerUnavailable +
                props.feedUnavailibilityDuration +
                props.other) /
                (props.totalTime -
                  props.idleDueToWorkerUnavailable +
                  props.feedUnavailibilityDuration +
                  props.other +
                  props.idleDueToWorkerUnavailable +
                  props.feedUnavailibilityDuration +
                  props.other)
            )}
          </p> */}
          </div>
        </div>
        <div className="rightTile">
          <div class="center-text" style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="dots dotBlue"
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                }}
              ></span>
              <p
                style={{
                  color: "#406E92",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {" "}
                Total Working Hours{" "}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#E6ECF1",
                width: "auto",
                padding: "8px 0px",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  color: "#406E92",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {Number(props.totalTime)?.toFixed(2)}
              </h6>
            </div>
          </div>
          <div class="center-text" style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="dots dotYellow"
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                }}
              ></span>
              <p
                style={{
                  color: "rgb(169 127 0)",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {" "}
                Worker Unavailable Hours{" "}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#FFFAEB",
                width: "auto",
                padding: "8px 0px",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  color: "rgb(169 127 0)",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {Number(props.idleDueToWorkerUnavailable)?.toFixed(2)}
              </h6>
            </div>
          </div>
          <div class="center-text" style={{ marginBottom: "12px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="dots dotOrange"
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                }}
              ></span>
              <p
                style={{
                  color: "#F9B263",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                Worker Available Hours
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#FEF4E8",
                width: "auto",
                padding: "8px 0px",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  color: "#F9B263",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                {Number(props.other)?.toFixed(2)}
              </h6>
            </div>
          </div>
          {/* <div class="center-text">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                className="dots dotRed"
                style={{
                  display: "block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "4px",
                }}
              ></span>
              <p>Idle-Other</p>
            </div>
            <div
              style={{
                backgroundColor: "#FEEFEA",
                width: "auto",
                padding: "8px 0px",
                borderRadius: "8px",
              }}
            >
              <h6
                style={{
                  color: "#F16230",
                  textAlign: "center",
                }}
              >
                {props.other}
              </h6>
            </div>
          </div> */}
        </div>
      </div>
      <div>
        <Typography
          variant="h6"
          style={{
            margin: "auto",
            position: "relative",
            textAlign: "center",

            color: "#f68f1d",
          }}
        >
          Total Available Hours{" "}
          <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
            {Number(props.totalTime)?.toFixed(2)}
          </span>
        </Typography>

        <Typography
          variant="h6"
          style={{
            margin: "auto",
            position: "relative",
            textAlign: "center",

            color: "#f68f1d",
          }}
        >
          % Utilization{" "}
          <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
            {" "}
            {Number(props?.utilizationPercentage)?.toFixed(2) + "%"}
          </span>
        </Typography>
      </div>
    </>
  );
}

export default DonutChart;
