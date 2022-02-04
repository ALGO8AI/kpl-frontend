/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import "./MachineStatus.scss";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import CancelIcon from "@material-ui/icons/Cancel";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import InfoIcon from "@material-ui/icons/Info";
import Chart from "react-apexcharts";
import { stitchingLines, theme } from "../../Utility/constants";
import { getLiveMachine } from "../../services/api.service";
import FilterListIcon from "@material-ui/icons/FilterList";

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
  const [data, setData] = useState({ data1: [], data2: [] });
  const [machineType, setMachineType] = useState([]);
  const [openFilter, setOpenFilter] = useState(false);
  const columns = [
    {
      title: "Machine ID",
      field: "machineId",
    },
    {
      title: "Status",
      render: (x) => status[x.status],
    },

    {
      title: "Utilisation %",
      field: "utilization%",
      render: (x) => x["utilization%"].toFixed(2),
    },
    {
      title: "Scheduled Hrs",
      field: "totalSchedule",
      render: (x) => x["totalSchedule"].toFixed(2),
    },
    {
      title: "Line",
      field: "line",
    },
    {
      title: "Wing",
      field: "wing",
    },
    {
      title: "Tailor Name",
      field: "workerName",
    },
    {
      title: "Clp Ctr",
      field: "clpctr",
    },

    // {
    //   title: "Start Time",
    //   field: "startTime",
    // },
    // {
    //   title: "End Time",
    //   field: "endTime",
    // },
    // {
    //   title: "Difference",
    //   field: "timeDiff",
    // },
  ];
  const status = {
    Stopped: <PauseCircleFilledIcon style={{ color: "#FFC014" }} />,
    Running: <CheckCircleIcon style={{ color: "#05c422" }} />,
    Offline: <CancelIcon style={{ color: "#C40303" }} />,
    Disabled: <FiberManualRecordIcon style={{ color: "#727272" }} />,
    Breakdown: <InfoIcon style={{ color: "#F0983D" }} />,
  };
  const [machineData, setMachineData] = useState({ data1: [], data2: [] });

  // functions
  const AddMachineType = (value) => {
    machineType.includes(value)
      ? setMachineType(machineType.filter((item) => item !== value))
      : setMachineType([...machineType, value]);
  };

  useEffect(() => {
    machineType.length > 0
      ? setData({
          ...data,
          data2: machineData?.data2?.filter((el) =>
            machineType.includes(el.status)
          ),
        })
      : setData({
          ...data,
          data2: machineData?.data2,
        });
  }, [machineType]);

  // getData
  const loadData = async () => {
    try {
      const { data1, data2 } = await getLiveMachine();
      setData({
        data1,
        data2,
      });
      setMachineData({
        data1,
        data2,
      });
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  // refresh Data
  const refreshData = async () => {
    try {
      const { data1, data2 } = await getLiveMachine();
      if (data1.length !== 0 && data2.length !== 0) {
        setData({
          data1,
          data2,
        });
        setMachineData({
          data1,
          data2,
        });
      }
    } catch (e) {
      console.log("ERROR", e);
    }
  };

  // useeffect
  useEffect(() => {
    loadData();
  }, []);

  // interval use effect
  useEffect(() => {
    const interval = setInterval(() => refreshData(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Grid container item xs={12}>
        <Typography style={{ color: theme.BLUE }} variant="h4">
          Total Number Of Machines : {machineData.length}
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
                "STOPPED",
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
            series={[
              machineData?.data1?.filter((item) => item.status === "Running")
                .length,
              machineData?.data1?.filter((item) => item.status === "Stopped")
                .length,
              machineData?.data1?.filter((item) => item.status === "Offline")
                .length,
              machineData?.data1?.filter((item) => item.status === "Disabled")
                .length,
              machineData?.data1?.filter((item) => item.status === "Breakdown")
                .length,
            ]}
            type="donut"
          />
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType?.includes("Running") ? 5 : 0}
          onClick={() => AddMachineType("Running")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#05c422" }}>
            <CheckCircleIcon style={{ marginRight: "8px" }} /> RUNNING
          </div>
          <div className="title" style={{ color: "#05c422", fontSize: "48px" }}>
            {
              machineData?.data1?.filter((item) => item.status === "Running")
                .length
            }
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType?.includes("Stopped") ? 5 : 0}
          onClick={() => AddMachineType("Stopped")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#FFC014" }}>
            <PauseCircleFilledIcon style={{ marginRight: "8px" }} /> STOPPED
          </div>
          <div className="title" style={{ color: "#FFC014", fontSize: "48px" }}>
            {
              machineData?.data1?.filter((item) => item.status === "Stopped")
                .length
            }
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("Offline") ? 5 : 0}
          onClick={() => AddMachineType("Offline")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#C40303" }}>
            <CancelIcon style={{ marginRight: "8px" }} /> OFFLINE
          </div>
          <div className="title" style={{ color: "#C40303", fontSize: "48px" }}>
            {
              machineData?.data1?.filter((item) => item.status === "Offline")
                .length
            }
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("Disabled") ? 5 : 0}
          onClick={() => AddMachineType("Disabled")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#727272" }}>
            <FiberManualRecordIcon style={{ marginRight: "8px" }} /> DISABLED
          </div>
          <div className="title" style={{ color: "#727272", fontSize: "48px" }}>
            {
              machineData?.data1?.filter((item) => item.status === "Disabled")
                .length
            }
          </div>
        </Paper>
      </Grid>
      <Grid container item xs={12} md={2}>
        <Paper
          elevation={machineType.includes("Breakdown") ? 5 : 0}
          onClick={() => AddMachineType("Breakdown")}
          className={classes.paper}
        >
          <div className="title" style={{ color: "#F0983D" }}>
            <InfoIcon style={{ marginRight: "8px" }} /> BREAKDOWN
          </div>
          <div className="title" style={{ color: "#F0983D", fontSize: "48px" }}>
            {
              machineData?.data1?.filter((item) => item.status === "Breakdown")
                .length
            }
          </div>
        </Paper>
      </Grid>
      <Grid xs={12} style={{ marginTop: "8px" }}>
        <Paper elevation={5} style={{ width: "100%", padding: "12px" }}>
          <Grid container style={{ margin: "24px 0", height: "56px" }}>
            <Grid item xs={12} lg={1} style={{ paddingRight: "12px" }}>
              <Button
                variant="contained"
                style={{
                  backgroundColor: openFilter ? theme.ORANGE : theme.BLUE,
                  color: "#FFF",
                  whiteSpace: "nowrap",
                  height: "100%",
                }}
                fullWidth
                onClick={() => {
                  setOpenFilter(!openFilter);
                }}
              >
                <FilterListIcon />
                FILTER
              </Button>
            </Grid>
            <Grid container item xs={12} lg={3}>
              {openFilter && (
                <>
                  <Grid
                    item
                    xs={12}
                    lg={4}
                    style={{ paddingRight: "12px", height: "100%" }}
                  >
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel keyid="demo-simple-select-outlined-label">
                        Wing
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // value={filterCondition.wing}
                        // onChange={(e) =>
                        //   setFilterConditiion({
                        //     ...filterCondition,
                        //     wing: e.target.value,
                        //   })
                        // }
                        label="Wing"
                        style={{ height: "56px" }}
                        // multiple
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {["FG2"].map((item, index) => (
                          <MenuItem value={item} key={index}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} lg={4} style={{ paddingRight: "12px" }}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel keyid="demo-simple-select-outlined-label">
                        Line
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        // value={filterCondition.zone}
                        // onChange={(e) =>
                        //   setFilterConditiion({
                        //     ...filterCondition,
                        //     zone: e.target.value,
                        //   })
                        // }
                        label="Line"
                        style={{ height: "56px" }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {stitchingLines.map((item, index) => (
                          <MenuItem value={item} key={index}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <MaterialTable
            title={"LIVE MACHINE STATUS"}
            columns={columns}
            data={data?.data2}
            options={{
              exportButton: true,
              headerStyle: {
                backgroundColor: "#0e4a7b",
                color: "#FFF",
              },
              pageSizeOptions: [20, 50, 100, 200],
              pageSize: 20,
            }}
            // onRowClick={rowClick}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default MachineStatusStitch;
