import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import "./MachineStatus.scss";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InfoIcon from "@material-ui/icons/Info";
import Chart from "react-apexcharts";
import { theme } from "../../Utility/constants";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    cursor: "pointer",
  },
});

function MachineStatusStitch() {
  // state
  const [machineType, setMachineType] = useState([]);

  // functions
  const AddMachineType = (value) => {
    machineType.includes(value)
      ? setMachineType(machineType.filter((item) => item !== value))
      : setMachineType([...machineType, value]);
  };

  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12}>
        <Typography style={{ color: theme.BLUE }} variant="h4">
          Total Number Of Machines : 250
        </Typography>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper elevation={5} className={classes.paper}>
          <Chart
            options={{
              chart: {
                type: "donut",
              },
              dataLabels: {
                enabled: false,
              },
              colors: ["#05c422", "#FFC014", "#C40303", "#727272", "#F0983D"],
              labels: [
                "RUNNING",
                "BSTOPPED",
                "OFFLINE",
                "DISABLED",
                "BREAKDOWN",
              ],

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
                  // colors: ["#094573", "#ffce38", "#ffa643", "#f16230"],
                  useSeriesColors: false,
                },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      //   width: 200,
                      height: 120,
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                },
              ],
            }}
            series={[50, 50, 50, 50, 50]}
            type="donut"
          />
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("running") ? 5 : 0}
          onClick={() => AddMachineType("running")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#05c422" }}>
            <CheckCircleIcon style={{ marginRight: "8px" }} /> RUNNING
          </div>
          <div className="title" style={{ color: "#05c422", fontSize: "48px" }}>
            50
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("stopped") ? 5 : 0}
          onClick={() => AddMachineType("stopped")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#FFC014" }}>
            <PauseCircleFilledIcon style={{ marginRight: "8px" }} /> STOPPED
          </div>
          <div className="title" style={{ color: "#FFC014", fontSize: "48px" }}>
            50
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("offline") ? 5 : 0}
          onClick={() => AddMachineType("offline")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#C40303" }}>
            <CancelIcon style={{ marginRight: "8px" }} /> OFFLINE
          </div>
          <div className="title" style={{ color: "#C40303", fontSize: "48px" }}>
            50
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("disabled") ? 5 : 0}
          onClick={() => AddMachineType("disabled")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#727272" }}>
            <FiberManualRecordIcon style={{ marginRight: "8px" }} /> DISABLED
          </div>
          <div className="title" style={{ color: "#727272", fontSize: "48px" }}>
            50
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("breakdown") ? 5 : 0}
          onClick={() => AddMachineType("breakdown")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#F0983D" }}>
            <InfoIcon style={{ marginRight: "8px" }} /> BREAKDOWN
          </div>
          <div className="title" style={{ color: "#F0983D", fontSize: "48px" }}>
            50
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MachineStatusStitch;
