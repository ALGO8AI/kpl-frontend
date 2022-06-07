/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./DonutChart.scss";
import { makeStyles } from "@material-ui/core/styles";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { StitchingContext } from "../../context/StitchingContext";
import Loader from "../loader/Loader";

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

function FeedDonut(props) {
  const { dispatch } = React.useContext(StitchingContext);

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
    colors: ["#a97f00", "#F9B263"],
    labels: ["Feed Unavailable Hours", "Feed Available Hours"],

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
        colors: ["#a97f00", "#F9B263"],
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          component={Link}
          to={props.link}
          onClick={() =>
            dispatch({ type: "VIOLATION_TAB", payload: props.payload_data })
          }
        >
          Feed Availability{"  "}
          {props?.loading && (
            <Loader style={{ color: "white", marginLeft: "8px" }} />
          )}
        </Typography>
      </div>
      <div className="donutCard">
        <div className="leftTile">
          <div className="chart">
            <Chart
              options={options}
              series={[
                Boolean(props?.data?.feedUnavailibilityDuration)
                  ? +props?.data?.feedUnavailibilityDuration
                  : 0,
                Boolean(props?.data?.balanceHours)
                  ? +props?.data?.balanceHours
                  : 0,
              ]}
              type="donut"
            />
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
                Total Available Hours{" "}
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
                {Number(props?.data?.totalTime)?.toFixed(2)}
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
                Feed Unavailable Hours{" "}
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
                {Number(props?.data?.feedUnavailibilityDuration)?.toFixed(2)}
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
                Feed Available Hours
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
                {Number(props?.data?.balanceHours)?.toFixed(2)}
              </h6>
            </div>
          </div>
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
            {Number(props?.data?.totalTime)?.toFixed(2)}
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
          % Availability{" "}
          <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
            {" "}
            {Number(props?.data?.utilizationPercentage)?.toFixed(2) + "%"}
          </span>
        </Typography>
      </div>
    </>
  );
}

export default FeedDonut;
