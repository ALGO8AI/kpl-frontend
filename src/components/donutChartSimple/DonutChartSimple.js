import React, { useState } from "react";
import Chart from "react-apexcharts";
import "../donutChart/DonutChart.scss";
import { makeStyles } from "@material-ui/core/styles";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const useStyles = makeStyles((theme) => ({
  formControl: {
    fontSize: "12px",
  },
  selectEmpty: {
    //   marginTop: theme.spacing(2),
  },
}));

function DonutChartSimple() {
  const classes = useStyles();

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

  const [series, setSeries] = useState([48, 18, 10, 8]);
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
          reset: true,
          customIcons: [],
        },
        // export: {
        //   csv: {
        //     filename: undefined,
        //     columnDelimiter: ",",
        //     headerCategory: "category",
        //     headerValue: "value",
        //     dateFormatter(timestamp) {
        //       return new Date(timestamp).toDateString();
        //     },
        //   },
        // },
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#094573", "#ffce38", "#ffa643", "#f16230"],
    labels: [
      "Actual working hour",
      "Idle- Breakdown",
      "Idle-feed unavailable",
      "Other",
    ],

    title: {
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              color: "#333",
            },
            value: {
              show: true,
              color: "#333",
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

  return (
    <div className="donutCardSimple">
      <div className="top">
        <p>Machine Utilization</p>
        <FormControl required className={classes.formControl}>
          <Select
            native
            value={state.age}
            onChange={handleChange}
            name="age"
            inputProps={{
              id: "age-native-required",
            }}
            style={{ width: "max-content" }}
          >
            <option value={10}>Weekly</option>
            <option value={20}>Monthly</option>
            <option value={30}>Yearly</option>
          </Select>
        </FormControl>
      </div>
      <div class="center-text">
        <div style={{ display: "flex", alignItems: "center" }}>
          <span
            style={{
              display: "block",
              width: "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: "#094573",
              marginRight: "4px",
            }}
          ></span>
          <p>Actual Functional hour</p>
        </div>
        <div
          style={{
            backgroundColor: "#E6ECF1",
            padding: "8px 24px",
            borderRadius: "8px",
          }}
        >
          <h6
            style={{
              color: "#406E92",
            }}
          >
            85
          </h6>
        </div>
      </div>
      <div className="chart">
        <Chart options={options} series={series} type="donut" />
      </div>
      {/* <div id='overlay'>
      COMING SOON
    </div> */}
      {/* <div style={{textAlign:'right'}}>
       
        </div>
        <div style={{marginTop:'10px',textAlign:'center'}} className='cont1'><div><span className='donBlue'></span>Actual Functional hour<span className='legBlue1'>1448</span></div> <FormControl required className={classes.formControl}>
        <InputLabel >Duration</InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange}
          name="age"
          inputProps={{
            id: 'age-native-required',
          }}
          style={{width:'max-content'}}
        >
          <option value={10}>Weekly</option>
          <option value={20}>Monthly</option>
          <option value={30}>Yearly</option>
        </Select>
      </FormControl></div>  
    <div id="chart1" style={{padding:'0px 50px'}}>
      <Chart options={options} series={series} type="donut" />
    </div>
    <div className='legend'> 

    </div> */}
    </div>
  );
}

export default DonutChartSimple;
