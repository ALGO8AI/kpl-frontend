// import classes from "*.module.css";
import { FormControl, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { StitchingContext } from "../../context/StitchingContext";
import "./AreaChart.scss";
function AreaChart(props) {
  const { dispatch } = React.useContext(StitchingContext);

  const [series, setSeries] = useState([]);
  const [week, setWeek] = useState([]);

  const [instance, setInstance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [state, setState] = React.useState({
    age: "",
    name: "hai",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  function changeWeek() {
    // console.log("in change week");
    // let curr = new Date(props.FROM);
    // let week = [props.FROM];
    // for (let i = 1; i <= 6; i++) {
    //   let first = curr.setDate(curr.getDate() + 1);
    //   week.push(new Date(first).toISOString().slice(5, 10));
    // }
    // console.log(week);
    // setWEEK(week);
  }

  function LoadData() {
    // setWEEK(props.week)
    var array = [];
    var ins = 0;
    var dur = 0;
    if (props.data != "no data") {
      var ary = props.data.map((item) => item.crowdingInstances);
      setWeek(
        props.data.map((item) => new Date(item.Date).toISOString().slice(0, 10))
      );
      props.data.map((d) => {
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
    // console.log("in Use Effect");
    changeWeek();
    LoadData();
  }, [props]);

  // useEffect(() => {
  //   console.log("in use effect");
  //   var array = [0, 0, 0, 0, 0, 0, 0];
  //   var ins = 0;
  //   var dur = 0;
  //   if (props.data != "no data") {
  //     props.data.map((d) => {
  //       array[d.day] = d.crowdingInstances;
  //       ins += d.crowdingInstances;
  //       dur += d.crowdingDuration;
  //     });
  //   }
  //   console.log(array);
  //   setSeries([
  //     {
  //       name: "crowding",
  //       data: array,
  //     },
  //   ]);
  //   setInstance(ins);
  //   setDuration(dur);
  // }, []);

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
          variant="h6"
          style={{
            margin: "auto",
            textAlign: "center",
            backgroundColor: "#f68f1d",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            textDecoration: "none",
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
        {/* <div className="bottom">
          <p>Total Crowding Instance:</p>
          <h4>
  
            {Math.round(instance)}
          </h4>
        </div>
        <div className="bottom">
          <p>Crowding duration: </p>
          <h4>{Math.round(duration)} Hrs. </h4>
        </div> */}
      </div>
      <Typography
        variant="h6"
        style={{ margin: "auto", textAlign: "center", color: "#f68f1d" }}
      >
        Total Crowding Instances:{" "}
        <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
          {Math.round(instance)}{" "}
        </span>
      </Typography>
      <Typography
        variant="h6"
        style={{ margin: "auto", textAlign: "center", color: "#f68f1d" }}
      >
        Crowding Duration:{" "}
        <span style={{ fontWeight: "bold", color: "#0e4a7b" }}>
          {Math.round(duration)} Hrs.{" "}
        </span>
      </Typography>
    </>
  );
}

export default AreaChart;
