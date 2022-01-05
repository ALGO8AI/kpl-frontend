/* eslint-disable eqeqeq */
import {
  AppBar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import PropTypes from "prop-types";

import clsx from "clsx";
import moment from "moment";
import React, { useState } from "react";
import { getNotificationLog } from "../../services/api.service";
import FilterListIcon from "@material-ui/icons/FilterList";
import { useDispatch } from "react-redux";
import {
  openSnackbar_FROM,
  openSnackbar_TO,
} from "../../redux/CommonReducer/CommonAction";
import { weekRange } from "../../Utility/DateRange";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container item xs={12} style={{ padding: "18px" }}>
          {children}
        </Grid>
      )}
    </Grid>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function NotificationLog() {
  // state
  const [value, setValue] = useState(0);
  const [data, setData] = useState();
  const [filterDateFrom, setFilterDateFrom] = useState();
  const [filterDateTo, setFilterDateTo] = useState();
  const [typeOfRange, setTypeOfRange] = useState("weekly");

  // redux dispatch
  const Dispatch = useDispatch();

  // functions

  // handle date range
  const handleDateRange = (value) => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
    var newDateMonthBack = new Date(
      myDate.getTime() - 60 * 60 * 24 * 30 * 1000
    );
    setTypeOfRange(value);
    switch (value) {
      case "weekly":
        setFilterDateFrom(newDateWeekBack.toISOString().slice(0, 10));
        setFilterDateTo(myDate.toISOString().slice(0, 10));
        break;
      case "monthly":
        setFilterDateFrom(newDateMonthBack.toISOString().slice(0, 10));
        setFilterDateTo(myDate.toISOString().slice(0, 10));
        break;
      case "custom":
        setFilterDateFrom(newDateWeekBack.toISOString().slice(0, 10));
        setFilterDateTo(myDate.toISOString().slice(0, 10));
        break;
      default:
        return null;
    }
  };

  const getLogs = async () => {
    try {
      var myDate = new Date();
      var newDateWeekBack = new Date(
        myDate.getTime() - 60 * 60 * 24 * 7 * 1000
      );
      const resp = await getNotificationLog(
        newDateWeekBack.toISOString().slice(0, 10),
        myDate.toISOString().slice(0, 10)
      );
      // console.log(resp);
      setData(resp);
    } catch (err) {
      // console.log(err);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    getLogs();
    setFilterDateFrom(weekRange()[0]);
    setFilterDateTo(weekRange()[1]);
  }, []);
  const filterLogs = async () => {
    try {
      const resp = await getNotificationLog(filterDateFrom, filterDateTo);
      // console.log(resp);
      setData(resp);
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <Grid container>
      <Grid container item xs={12}>
        <Grid
          container
          item
          xs={6}
          md={2}
          // style={{ justifyContent: "center", marginBottom: "8px" }}
        >
          <FormControl
            variant="outlined"
            fullWidth
            style={{ marginRight: "6px" }}
          >
            <InputLabel id="demo-simple-select-outlined-label">
              Date Range
            </InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={typeOfRange}
              onChange={(e) => handleDateRange(e.target.value)}
              label="Machine ID"
              // multiple
            >
              <MenuItem value={"weekly"}>Weekly</MenuItem>
              <MenuItem value={"monthly"}>Monthly</MenuItem>
              <MenuItem value={"custom"}>Custom</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {typeOfRange === "custom" && (
          <>
            <Grid container item xs={6} md={2}>
              <TextField
                label="From"
                value={filterDateFrom}
                type="date"
                style={{ marginRight: "6px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => {
                  e.target.value > filterDateTo
                    ? Dispatch(openSnackbar_FROM())
                    : setFilterDateFrom(e.target.value);
                }}
                fullWidth
              />
            </Grid>

            <Grid container item xs={6} md={2}>
              <TextField
                label="To"
                value={filterDateTo}
                type="date"
                style={{ marginRight: "6px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                onChange={(e) => {
                  e.target.value < filterDateFrom
                    ? Dispatch(openSnackbar_TO())
                    : setFilterDateTo(e.target.value);
                }}
                // onChange={(e) => setFilterDateTo(e.target.value)}
                fullWidth
              />
            </Grid>
          </>
        )}
        <Grid container item xs={12} md={2}>
          <Button
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
            onClick={filterLogs}
          >
            <FilterListIcon />
            Filter
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12} container style={{ padding: "1rem" }}>
        <AppBar position="static" className="customTab">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Feed Data" {...a11yProps(0)} />
            <Tab label="Crowd Data" {...a11yProps(1)} />
            <Tab label="Worker Data" {...a11yProps(2)} />
            <Tab label="Machine Violation" {...a11yProps(3)} />
            <Tab label="Machine Breakdown" {...a11yProps(4)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {data?.feedData?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{
                height: "700px",
                width: "100%",
              }}
            >
              <DataGrid
                components={{
                  Toolbar: GridToolbar,
                }}
                // rows={data}
                rows={data?.feedData?.map((row, i) => {
                  const {
                    DateTime,
                    helperSentStatus,
                    managerSentStatus,
                    supervisorSentStatus,
                    wingInchargeSentStatus,
                    ...rest
                  } = row;
                  return {
                    id: i,
                    DateTime: moment(new Date(DateTime))
                      .format("DD/MM/YYYY")
                      .toString(),
                    ...rest,
                    helperSentStatus: Boolean(helperSentStatus)
                      ? "True"
                      : "False",
                    managerSentStatus: Boolean(managerSentStatus)
                      ? "True"
                      : "False",
                    supervisorSentStatus: Boolean(supervisorSentStatus)
                      ? "True"
                      : "False",
                    wingInchargeSentStatus: Boolean(wingInchargeSentStatus)
                      ? "True"
                      : "False",
                  };
                })}
                columns={[
                  {
                    field: "Id",
                    headerName: "Violation ID",
                    width: 210,
                  },
                  {
                    field: "DateTime",
                    headerName: "Date",
                    width: 150,
                  },
                  {
                    field: "Wing",
                    headerName: "Wing",
                    width: 120,
                  },
                  {
                    field: "FeedID",
                    headerName: "Feed ID",
                    width: 150,
                  },
                  {
                    field: "MachineID",
                    headerName: "Machine ID",
                    width: 180,
                  },
                  {
                    field: "WorkerID",
                    headerName: "Worker ID",
                    width: 180,
                  },
                  {
                    field: "workerName",
                    headerName: "Worker Name",
                    width: 180,
                  },
                  {
                    field: "StartTime",
                    headerName: "Start Time",
                    width: 150,
                  },
                  {
                    field: "EndTime",
                    headerName: "End Time",
                    width: 150,
                  },

                  {
                    field: "UnavailableDuration",
                    headerName: "Unavailable Duration",
                    width: 210,
                  },

                  {
                    field: "uuid",
                    headerName: "Unique ID",
                    width: 240,
                  },
                  {
                    field: "video",
                    headerName: "Video",
                    width: 150,
                    hide: "true",
                  },
                  {
                    field: "img",
                    headerName: "Image",
                    width: 150,
                    hide: "true",
                  },

                  {
                    field: "query",
                    headerName: "Violation Status",
                    width: 240,
                  },
                  {
                    field: "shift",
                    headerName: "Shift",
                    width: 150,
                  },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 240,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 300,
                  },
                  {
                    field: "action",
                    headerName: "Action Taken",
                    width: 280,
                  },
                  {
                    field: "confirmStatus",
                    headerName: "Confirm Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectStatus",
                    headerName: "Incorrect Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectViolationReason",
                    headerName: "Incorrect Violation Reason",
                    width: 270,
                  },
                  {
                    field: "communicatedTo",
                    headerName: "Communicated To",
                    width: 210,
                  },
                  {
                    field: "Reassigned Supervisor",
                    headerName: "Reassigned Supervisor",
                    width: 240,
                  },

                  // {
                  //   field: "wingInchargeSentStatus",
                  //   headerName: "Wing Incharge Status",
                  //   width: 210,
                  // cellClassName: (params) =>
                  //   clsx({
                  //     negative: params.value === "False",
                  //     positive: params.value === "True",
                  //   }),
                  // },
                ]}
                style={{ width: "100%" }}
              />
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {data?.crowdData?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{
                height: "700px",
                width: "100%",
              }}
            >
              <DataGrid
                components={{
                  Toolbar: GridToolbar,
                }}
                // rows={data}
                rows={data?.crowdData?.map((row, i) => {
                  const {
                    DateTime,
                    helperSentStatus,
                    managerSentStatus,
                    supervisorSentStatus,
                    wingInchargeSentStatus,
                    ...rest
                  } = row;
                  return {
                    id: i,
                    DateTime: moment(new Date(DateTime))
                      .format("DD/MM/YYYY")
                      .toString(),
                    ...rest,
                    helperSentStatus: Boolean(helperSentStatus)
                      ? "True"
                      : "False",
                    managerSentStatus: Boolean(managerSentStatus)
                      ? "True"
                      : "False",
                    supervisorSentStatus: Boolean(supervisorSentStatus)
                      ? "True"
                      : "False",
                    wingInchargeSentStatus: Boolean(wingInchargeSentStatus)
                      ? "True"
                      : "False",
                  };
                })}
                columns={[
                  {
                    field: "Id",
                    headerName: "Violation ID",
                    width: 150,
                  },
                  {
                    field: "DateTime",
                    headerName: "Date",
                    width: 150,
                  },
                  {
                    field: "Wing",
                    headerName: "Wing",
                    width: 120,
                  },
                  {
                    field: "CamID",
                    headerName: "Cam ID",
                    width: 180,
                  },

                  {
                    field: "crowdId",
                    headerName: "Crowd ID",
                    width: 180,
                  },

                  {
                    field: "crowdStartTime",
                    headerName: "Crowd Start Time",
                    width: 210,
                  },
                  {
                    field: "crowdEndTime",
                    headerName: "Crowd End Time",
                    width: 210,
                  },
                  {
                    field: "day",
                    headerName: "Day",
                    width: 150,
                  },

                  {
                    field: "CrowdingDuration",
                    headerName: "Crowding Duration",
                    width: 210,
                  },

                  {
                    field: "MaxPerson",
                    headerName: "Max Person",
                    width: 240,
                  },
                  {
                    field: "MinPerson",
                    headerName: "Min Person",
                    width: 240,
                  },
                  {
                    field: "video",
                    headerName: "Video",
                    width: 150,
                    hide: "true",
                  },
                  {
                    field: "img",
                    headerName: "Image",
                    width: 150,
                    hide: "true",
                  },
                  {
                    field: "status",
                    headerName: "Status",
                    width: 180,
                  },

                  {
                    field: "query",
                    headerName: "Query",
                    width: 180,
                  },
                  {
                    field: "shift",
                    headerName: "Shift",
                    width: 120,
                  },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 240,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 300,
                  },
                  {
                    field: "action",
                    headerName: "Action Taken",
                    width: 280,
                  },
                  {
                    field: "confirmStatus",
                    headerName: "Confirm Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectStatus",
                    headerName: "Incorrect Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectViolationReason",
                    headerName: "Incorrect Violation Reason",
                    width: 270,
                  },
                  {
                    field: "communicatedTo",
                    headerName: "Communicated To",
                    width: 210,
                  },
                  {
                    field: "Reassigned Supervisor",
                    headerName: "ReassignedSupervisor",
                    width: 240,
                  },
                ]}
                style={{ width: "100%" }}
              />
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {data?.workerData?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{
                height: "700px",
                width: "100%",
              }}
            >
              <DataGrid
                components={{
                  Toolbar: GridToolbar,
                }}
                // rows={data}
                rows={data?.workerData?.map((row, i) => {
                  const {
                    DateTime,
                    helperSentStatus,
                    managerSentStatus,
                    supervisorSentStatus,
                    wingInchargeSentStatus,
                    ...rest
                  } = row;
                  return {
                    id: i,
                    DateTime: moment(new Date(DateTime))
                      .format("DD/MM/YYYY")
                      .toString(),
                    ...rest,
                    helperSentStatus: Boolean(helperSentStatus)
                      ? "True"
                      : "False",
                    managerSentStatus: Boolean(managerSentStatus)
                      ? "True"
                      : "False",
                    supervisorSentStatus: Boolean(supervisorSentStatus)
                      ? "True"
                      : "False",
                    wingInchargeSentStatus: Boolean(wingInchargeSentStatus)
                      ? "True"
                      : "False",
                  };
                })}
                columns={[
                  {
                    field: "Id",
                    headerName: "Violation ID",
                    width: 180,
                  },
                  {
                    field: "DateTime",
                    headerName: "Date",
                    width: 150,
                  },
                  {
                    field: "workerID",
                    headerName: "Worker ID",
                    width: 180,
                  },
                  {
                    field: "workerName",
                    headerName: "Worker Name",
                    width: 180,
                  },
                  {
                    field: "wing",
                    headerName: "Wing",
                    width: 120,
                  },

                  {
                    field: "machineId",
                    headerName: "Machine ID",
                    width: 150,
                  },
                  {
                    field: "ViolationDuration",
                    headerName: "Violation Duration",
                    width: 210,
                  },

                  {
                    field: "startTime",
                    headerName: "Start Time",
                    width: 150,
                  },
                  {
                    field: "endTime",
                    headerName: "End Time",
                    width: 150,
                  },
                  {
                    field: "uuid",
                    headerName: "Unique ID",
                    width: 240,
                  },

                  // {
                  //   field: "UnavailableDuration",
                  //   headerName: "UnavailableDuration",
                  //   width: 210,
                  // },

                  {
                    field: "video",
                    headerName: "Video",
                    width: 150,
                    hide: "true",
                  },
                  {
                    field: "img",
                    headerName: "Image",
                    width: 150,
                    hide: "true",
                  },
                  {
                    field: "status",
                    headerName: "Status",
                    width: 180,
                  },

                  {
                    field: "query",
                    headerName: "Violation Status",
                    width: 210,
                  },
                  {
                    field: "shift",
                    headerName: "Shift",
                    width: 120,
                  },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 210,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 300,
                  },
                  {
                    field: "action",
                    headerName: "Action Taken",
                    width: 280,
                  },
                  {
                    field: "confirmStatus",
                    headerName: "Confirm Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectStatus",
                    headerName: "Incorrect Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectViolationReason",
                    headerName: "Incorrect Violation Reason",
                    width: 270,
                  },
                  {
                    field: "communicatedTo",
                    headerName: "Communicated To",
                    width: 210,
                  },
                  {
                    field: "reassignedSupervisor",
                    headerName: "Reassigned Supervisor",
                    width: 240,
                  },
                ]}
                style={{ width: "100%" }}
              />
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {data?.machineViolation?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{
                height: "700px",
                width: "100%",
              }}
            >
              <DataGrid
                components={{
                  Toolbar: GridToolbar,
                }}
                // rows={data}
                rows={data?.machineViolation?.map((row, i) => {
                  const {
                    id,
                    Date_Hour,
                    confirmStatus,
                    status,
                    incorrectStatus,
                    ...rest
                  } = row;
                  return {
                    id: i,
                    Id: id,
                    Date: moment(new Date(Date_Hour))
                      .format("DD/MM/YYYY")
                      .toString(),
                    confirmStatus: Boolean(confirmStatus) ? "True" : "False",
                    status: Boolean(status) ? "True" : "False",
                    incorrectStatus: Boolean(incorrectStatus)
                      ? "True"
                      : "False",

                    ...rest,
                  };
                })}
                columns={[
                  {
                    field: "Id",
                    headerName: "Violation ID",
                    width: 180,
                  },
                  {
                    field: "Date",
                    headerName: "Date",
                    width: 150,
                  },
                  {
                    field: "workerId",
                    headerName: "Worker ID",
                    width: 180,
                  },
                  {
                    field: "workerName",
                    headerName: "Worker Name",
                    width: 180,
                  },
                  {
                    field: "wing",
                    headerName: "Wing",
                    width: 120,
                  },

                  {
                    field: "machineId",
                    headerName: "Machine ID",
                    width: 150,
                  },

                  {
                    field: "startTime",
                    headerName: "Start Time",
                    width: 150,
                  },
                  {
                    field: "endTime",
                    headerName: "End Time",
                    width: 150,
                  },
                  // { field: "uuid", headerName: "Unique ID", width: 240 },

                  // {
                  //   field: "UnavailableDuration",
                  //   headerName: "UnavailableDuration",
                  //   width: 210,
                  // },

                  // {
                  //   field: "video",
                  //   headerName: "Video",
                  //   width: 150,
                  //   hide: "true",
                  // },
                  // {
                  //   field: "img",
                  //   headerName: "Image",
                  //   width: 150,
                  //   hide: "true",
                  // },
                  {
                    field: "status",
                    headerName: "Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },

                  // {
                  //   field: "query",
                  //   headerName: "Violation Status",
                  //   width: 210,
                  // },
                  {
                    field: "shift",
                    headerName: "Shift",
                    width: 120,
                  },
                  {
                    field: "ctr",
                    headerName: "CTR",
                    width: 120,
                  },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 210,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 300,
                  },
                  {
                    field: "violationDuration",
                    headerName: "Violation Duration",
                    width: 210,
                  },
                  {
                    field: "action",
                    headerName: "Action Taken",
                    width: 280,
                  },
                  {
                    field: "actionStatus",
                    headerName: "Action Status",
                    width: 180,
                  },
                  {
                    field: "confirmStatus",
                    headerName: "Confirm Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectStatus",
                    headerName: "Incorrect Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectViolationReason",
                    headerName: "Incorrect Violation Reason",
                    width: 270,
                  },
                  {
                    field: "communicatedTo",
                    headerName: "Communicated To",
                    width: 210,
                  },
                  {
                    field: "reassignedSupervisor",
                    headerName: "Reassigned Supervisor",
                    width: 240,
                  },
                ]}
                style={{ width: "100%" }}
              />
            </Grid>
          )}
        </TabPanel>
        <TabPanel value={value} index={4}>
          {data?.machineBreakdown?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{
                height: "700px",
                width: "100%",
              }}
            >
              <DataGrid
                components={{
                  Toolbar: GridToolbar,
                }}
                // rows={data}
                rows={data?.machineBreakdown?.map((row, i) => {
                  const {
                    id,
                    Date_Hour,
                    confirmStatus,
                    status,
                    incorrectStatus,
                    ...rest
                  } = row;
                  return {
                    id: i,
                    Id: id,
                    Date: moment(new Date(Date_Hour))
                      .format("DD/MM/YYYY")
                      .toString(),
                    confirmStatus: Boolean(confirmStatus) ? "True" : "False",
                    status: Boolean(status) ? "True" : "False",
                    incorrectStatus: Boolean(incorrectStatus)
                      ? "True"
                      : "False",

                    ...rest,
                  };
                })}
                columns={[
                  {
                    field: "Id",
                    headerName: "Violation ID",
                    width: 180,
                  },
                  {
                    field: "Date",
                    headerName: "Date",
                    width: 150,
                  },
                  {
                    field: "workerId",
                    headerName: "Worker ID",
                    width: 180,
                  },
                  {
                    field: "workerName",
                    headerName: "Worker Name",
                    width: 180,
                  },
                  {
                    field: "wing",
                    headerName: "Wing",
                    width: 120,
                  },

                  {
                    field: "machineId",
                    headerName: "Machine ID",
                    width: 150,
                  },

                  {
                    field: "startTime",
                    headerName: "Start Time",
                    width: 150,
                  },
                  {
                    field: "endTime",
                    headerName: "End Time",
                    width: 150,
                  },
                  // { field: "uuid", headerName: "Unique ID", width: 240 },

                  // {
                  //   field: "UnavailableDuration",
                  //   headerName: "UnavailableDuration",
                  //   width: 210,
                  // },

                  // {
                  //   field: "video",
                  //   headerName: "Video",
                  //   width: 150,
                  //   hide: "true",
                  // },
                  // {
                  //   field: "img",
                  //   headerName: "Image",
                  //   width: 150,
                  //   hide: "true",
                  // },
                  {
                    field: "status",
                    headerName: "Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },

                  // {
                  //   field: "query",
                  //   headerName: "Violation Status",
                  //   width: 210,
                  // },
                  {
                    field: "shift",
                    headerName: "Shift",
                    width: 120,
                  },
                  {
                    field: "ctr",
                    headerName: "CTR",
                    width: 120,
                  },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 210,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 300,
                  },
                  {
                    field: "violationDuration",
                    headerName: "Violation Duration",
                    width: 210,
                  },
                  {
                    field: "action",
                    headerName: "Action Taken",
                    width: 280,
                  },
                  {
                    field: "actionStatus",
                    headerName: "Action Status",
                    width: 280,
                  },
                  {
                    field: "confirmStatus",
                    headerName: "Confirm Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectStatus",
                    headerName: "Incorrect Status",
                    width: 180,
                    cellClassName: (params) =>
                      clsx({
                        negative: params.value == "false",
                        positive: params.value == "true",
                      }),
                  },
                  {
                    field: "incorrectViolationReason",
                    headerName: "Incorrect Violation Reason",
                    width: 270,
                  },
                  {
                    field: "communicatedTo",
                    headerName: "Communicated To",
                    width: 210,
                  },
                  {
                    field: "reassignedSupervisor",
                    headerName: "Reassigned Supervisor",
                    width: 240,
                  },
                ]}
                style={{ width: "100%" }}
              />
            </Grid>
          )}
        </TabPanel>
      </Grid>

      {/* {data?.length > 0 ? (
        <Grid container item xs={12} style={{ height: "700px", width: "100%" }}>
          <DataGrid
            components={{
              Toolbar: GridToolbar,
            }}
            // rows={data}
            rows={data.map((row, i) => {
              const {
                date,
                helperSentStatus,
                managerSentStatus,
                supervisorSentStatus,
                wingInchargeSentStatus,
                ...rest
              } = row;
              return {
                id: i,
                date: moment(new Date(date))
                  .format("DD/MM/YYYY")
                  .toString(),
                ...rest,
                helperSentStatus: Boolean(helperSentStatus) ? "True" : "False",
                managerSentStatus: Boolean(managerSentStatus)
                  ? "True"
                  : "False",
                supervisorSentStatus: Boolean(supervisorSentStatus)
                  ? "True"
                  : "False",
                wingInchargeSentStatus: Boolean(wingInchargeSentStatus)
                  ? "True"
                  : "False",
              };
            })}
            columns={columns}
            style={{ width: "100%" }}
          />
        </Grid>
      ) : (
        <div
          container
          item
          xs={12}
          style={{ width: "100%", padding: "12px", margin: "12px 0" }}
          className={classes.root}
        >
          <LinearProgress />
        </div>
      )} */}
    </Grid>
  );
}

export default NotificationLog;
