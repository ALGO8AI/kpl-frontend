// import classes from "*.module.css";
import { FormControl, Select, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { CheckingContext } from "../../context/CheckingContext";
import "./AreaChart.scss";
function AreaChartChecking(props) {
  const { dispatch } = React.useContext(CheckingContext);

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
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      colors: "#ff7b00",
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
        text: "Count",
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
          <Chart options={options} series={series} type="area" height={200} />
        </div>
        <div className="bottom">
          <p>Total Crowding Instance:</p>
          <h4>
            {/* {props.data[0] ? props.data[0].crowdingInstances : "-"} */}
            {Math.round(instance)}
          </h4>
        </div>
        <div className="bottom">
          <p>Crowding duration: </p>
          <h4>{Math.round(duration)} Hrs. </h4>
        </div>
        {/* <div className='centerTitle'>Crowding Instance</div>
        <Chart options={options} series={series} type="area" height={200} />
        <div className='d1'>
            <div>
            Total Crowding Instance:
            </div> 
      {/* <div>{props.data[0]?props.data[0].crowdingInstances:"-"}</div> */}
        {/* <div>{instance}</div> */}

        {/* </div>
            <div className='d1'>
            <div>
            Crowding duration: 
             </div> */}
        {/* <div>{props.data[0]? props.data[0].crowdingDuration:"-"} Hrs.</div> */}
        {/* <div>{duration.toFixed(2)} Hrs.</div>

            </div> */}
      </div>
    </>
  );
}

export default AreaChartChecking;
