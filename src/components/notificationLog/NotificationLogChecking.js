/* eslint-disable eqeqeq */
import { AppBar, Button, Grid, Tab, Tabs, TextField } from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import PropTypes from "prop-types";

import clsx from "clsx";
import moment from "moment";
import React from "react";
import { getNotificationLogChecking } from "../../services/api.service";
import FilterListIcon from "@material-ui/icons/FilterList";

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

function NotificationLogChecking() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = React.useState();
  const [filterDateFrom, setFilterDateFrom] = React.useState();
  const [filterDateTo, setFilterDateTo] = React.useState();

  const getLogs = async () => {
    try {
      const resp = await getNotificationLogChecking();
      // console.log(resp);
      setData(resp);
    } catch (err) {
      // console.log(err);
    }
  };

  const getFirstDay_LastDay = async () => {
    var myDate = new Date();
    var newDateWeekBack = new Date(myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
    setFilterDateFrom(newDateWeekBack.toISOString().slice(0, 10));
    setFilterDateTo(myDate.toISOString().slice(0, 10));
  };

  React.useEffect(() => {
    getLogs();
    getFirstDay_LastDay();
  }, []);
  const filterLogs = async () => {
    try {
      const resp = await getNotificationLogChecking(
        filterDateFrom,
        filterDateTo
      );
      // console.log(resp);
      setData(resp);
    } catch (err) {
      // console.log(err);
    }
  };
  return (
    <Grid container>
      <Grid container item xs={12}>
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
            onChange={(e) => setFilterDateFrom(e.target.value)}
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
            onChange={(e) => setFilterDateTo(e.target.value)}
            fullWidth
          />
        </Grid>
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
            <Tab label="Crowd Data" {...a11yProps(0)} />
            <Tab label="Worker Data" {...a11yProps(1)} />
            <Tab label="Defect Data" {...a11yProps(2)} />

            {/* <Tab label="Worker Data" {...a11yProps(2)} />
            <Tab label="Machine Data" {...a11yProps(3)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {data?.crowdData?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{ height: "700px", width: "100%" }}
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
                  { field: "Id", headerName: "Violation ID", width: 210 },
                  { field: "crowdId", headerName: "Crowd ID", width: 210 },
                  { field: "DateTime", headerName: "Date", width: 150 },
                  { field: "Wing", headerName: "Wing", width: 120 },
                  { field: "CamID", headerName: "Cam ID", width: 150 },

                  {
                    field: "crowdStartTime",
                    headerName: "Start Time",
                    width: 150,
                  },
                  { field: "crowdEndTime", headerName: "End Time", width: 150 },
                  { field: "day", headerName: "Day", width: 150 },
                  {
                    field: "CrowdingDuration",
                    headerName: "Crowding Duration",
                    width: 240,
                  },
                  {
                    field: "MaxPerson",
                    headerName: "Max Person",
                    width: 180,
                  },
                  {
                    field: "MinPerson",
                    headerName: "Min Person",
                    width: 180,
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
                    width: 150,
                    hide: "true",
                  },

                  {
                    field: "query",
                    headerName: "Violation Status",
                    width: 240,
                  },
                  { field: "shift", headerName: "Shift", width: 150 },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 240,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 180,
                  },
                  {
                    field: "action",
                    headerName: "Action",
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
        <TabPanel value={value} index={1}>
          {data?.workerData?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{ height: "700px", width: "100%" }}
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
                  { field: "Id", headerName: "Violation ID", width: 180 },
                  { field: "DateTime", headerName: "Date", width: 150 },
                  { field: "workerID", headerName: "Worker ID", width: 180 },
                  {
                    field: "workerName",
                    headerName: "Worker Name",
                    width: 180,
                  },
                  { field: "wing", headerName: "Wing", width: 120 },

                  { field: "tableId", headerName: "Table ID", width: 150 },
                  {
                    field: "ViolationDuration",
                    headerName: "Violation Duration",
                    width: 210,
                  },

                  { field: "startTime", headerName: "Start Time", width: 150 },
                  { field: "endTime", headerName: "End Time", width: 150 },
                  { field: "uuid", headerName: "Unique ID", width: 240 },

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
                  { field: "status", headerName: "Status", width: 180 },

                  {
                    field: "query",
                    headerName: "Violation Status",
                    width: 210,
                  },
                  { field: "shift", headerName: "Shift", width: 120 },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 210,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 210,
                  },
                  {
                    field: "action",
                    headerName: "Action",
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
        <TabPanel value={value} index={2}>
          {data?.defectData?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{ height: "700px", width: "100%" }}
            >
              <DataGrid
                components={{
                  Toolbar: GridToolbar,
                }}
                // rows={data}
                rows={data?.defectData?.map((row, i) => {
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
                  };
                })}
                columns={[
                  { field: "Id", headerName: "Defect ID", width: 180 },
                  { field: "DateTime", headerName: "Date", width: 150 },
                  { field: "action", headerName: "Action", width: 150 },
                  {
                    field: "actionStatus",
                    headerName: "Action Status",
                    width: 240,
                  },
                  {
                    field: "bagId",
                    headerName: "Bag ID",
                    width: 240,
                  },

                  {
                    field: "checker_emp_id",
                    headerName: "Checker ID",
                    width: 240,
                  },
                  {
                    field: "checker_name",
                    headerName: "Checker Name",
                    width: 240,
                  },
                  {
                    field: "communicatedTo",
                    headerName: "Communicated To",
                    width: 240,
                  },
                  {
                    field: "confirmStatus",
                    headerName: "Confirm Status",
                    width: 240,
                  },
                  {
                    field: "ctr_no",
                    headerName: "CTR No.",
                    width: 150,
                  },
                  {
                    field: "defectName",
                    headerName: "Defect Name",
                    width: 240,
                  },
                  {
                    field: "incorrectStatus",
                    headerName: "Incorrect Status",
                    width: 270,
                  },
                  {
                    field: "incorrectViolationReason",
                    headerName: "Incorrect Violation Reason",
                    width: 270,
                  },
                  {
                    field: "line",
                    headerName: "Line",
                    width: 120,
                  },
                  {
                    field: "reassignedSupervisor",
                    headerName: "Reassigned Supervisor",
                    width: 240,
                  },
                  {
                    field: "shift",
                    headerName: "Shift",
                    width: 180,
                  },
                  {
                    field: "status",
                    headerName: "Status",
                    width: 180,
                  },
                  {
                    field: "supervisorId",
                    headerName: "Supervisor ID",
                    width: 240,
                  },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 240,
                  },
                  {
                    field: "table_no",
                    headerName: "Table No.",
                    width: 240,
                  },
                  {
                    field: "tailorName",
                    headerName: "Tailor Name",
                    width: 240,
                  },
                  {
                    field: "tailorNumber",
                    headerName: "Tailor Number",
                    width: 240,
                  },
                  {
                    field: "time",
                    headerName: "Time",
                    width: 240,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 240,
                  },
                  { field: "wing", headerName: "Wing", width: 120 },
                ]}
                style={{ width: "100%" }}
              />
            </Grid>
          )}
        </TabPanel>

        {/* <TabPanel value={value} index={2}>
          {data?.workerData?.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{ height: "700px", width: "100%" }}
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
                  { field: "Id", headerName: "Violation ID", width: 180 },
                  { field: "DateTime", headerName: "Date", width: 150 },
                  { field: "workerID", headerName: "Worker ID", width: 180 },
                  {
                    field: "workerName",
                    headerName: "Worker Name",
                    width: 180,
                  },
                  { field: "wing", headerName: "Wing", width: 120 },

                  { field: "machineId", headerName: "Machine ID", width: 150 },
                  {
                    field: "ViolationDuration",
                    headerName: "Violation Duration",
                    width: 210,
                  },

                  { field: "startTime", headerName: "Start Time", width: 150 },
                  { field: "endTime", headerName: "End Time", width: 150 },
                  { field: "uuid", headerName: "Unique ID", width: 240 },

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
                  { field: "status", headerName: "Status", width: 180 },

                  {
                    field: "query",
                    headerName: "Violation Status",
                    width: 210,
                  },
                  { field: "shift", headerName: "Shift", width: 120 },
                  {
                    field: "supervisorName",
                    headerName: "Supervisor Name",
                    width: 210,
                  },
                  {
                    field: "violationReason",
                    headerName: "Violation Reason",
                    width: 210,
                  },
                  {
                    field: "action",
                    headerName: "Action",
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
        <TabPanel value={value} index={3}>
          <Typography variant="h5">Machine Logs</Typography>
        </TabPanel> */}
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

export default NotificationLogChecking;
