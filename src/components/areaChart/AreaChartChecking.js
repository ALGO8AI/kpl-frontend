/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// import classes from "*.module.css";
import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { CheckingContext } from "../../context/CheckingContext";
import "./AreaChart.scss";
function AreaChartChecking(props) {
  // DISPATCH
  const { dispatch } = React.useContext(CheckingContext);

  // STATE
  const [series, setSeries] = useState([]);
  const [week, setWeek] = useState([]);
  const [instance, setInstance] = useState(0);
  const [duration, setDuration] = useState(0);

  function LoadData() {
    var array = [];
    var ins = 0;
    var dur = 0;
    if (props.data !== "no data") {
      var ary = props?.data?.map((item) => item.crowdingInstances);
      setWeek(
        props?.data?.map((item) =>
          new Date(item.Date).toISOString().slice(0, 10)
        )
      );
      props?.data?.map((d) => {
        array[d.day] = d.crowdingInstances;
        ins += d.crowdingInstances;
        dur += d.crowdingDuration;
      });
    }
    setSeries([
      {
        name: "crowding",
        data: ary,
      },
    ]);
    setInstance(ins);
    setDuration(dur);
  }

  useEffect(() => {
    LoadData();
  }, [props]);

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
    colors: ["#f68f1d"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },

    fill: {
      colors: "#ec811c",
      opacity: 0.8,
      type: "solid",
    },
    xaxis: {
      type: "date",
      categories: week,
      title: {
        text: "Date",
        style: {
          color: "#0e4a7b",
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    yaxis: {
      title: {
        text: "Crowding Instances",
        style: {
          color: "#0e4a7b",
          fontSize: "12px",
          fontWeight: 400,
        },
      },
    },
    tooltip: {
      x: {},
    },
  };

  return (
    <>
      <div className="top" style={{ display: "flex" }}>
        <Typography
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
          Crowding Instance
        </Typography>
      </div>
      <div className="GraphCardSimple">
        <div className="chart">
          <Chart options={options} series={series} type="line" height={200} />
        </div>
      </div>
      <Typography
        variant="h6"
        style={{
          margin: "auto",
          textAlign: "center",

          color: "#f68f1d",
        }}
      >
        Total Crowding Instances:{" "}
        <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
          {instance}{" "}
        </span>
      </Typography>
      <Typography
        variant="h6"
        style={{
          margin: "auto",
          textAlign: "center",
          color: "#f68f1d",
        }}
      >
        Crowding Duration:{" "}
        <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
          {duration.toFixed(2)} Hrs.{" "}
        </span>
      </Typography>
    </>
  );
}

export default AreaChartChecking;
