/* eslint-disable eqeqeq */
import {
  AppBar,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import PropTypes from "prop-types";

import clsx from "clsx";
import moment from "moment";
import React from "react";
import FilterListIcon from "@material-ui/icons/FilterList";
import { getNotificationLog } from "../../../services/api.service";

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

function RollSummary() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = React.useState();
  const [filterDateFrom, setFilterDateFrom] = React.useState();
  const [filterDateTo, setFilterDateTo] = React.useState();

  const getLogs = async () => {
    try {
      const resp = await getNotificationLog();
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
        {/* <AppBar position="static" className="customTab">
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
            <Tab label="Machine Data" {...a11yProps(3)} />
          </Tabs>
        </AppBar> */}
        {/* <TabPanel value={value} index={0}> */}
        {data?.feedData?.length > 0 && (
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
                { field: "Id", headerName: "Violation ID", width: 210 },
                { field: "DateTime", headerName: "Date", width: 150 },
                { field: "Wing", headerName: "Wing", width: 120 },
                { field: "FeedID", headerName: "Feed ID", width: 150 },
                { field: "MachineID", headerName: "Machine ID", width: 180 },
                { field: "WorkerID", headerName: "Worker ID", width: 180 },
                {
                  field: "workerName",
                  headerName: "Worker Name",
                  width: 180,
                },
                { field: "StartTime", headerName: "Start Time", width: 150 },
                { field: "EndTime", headerName: "End Time", width: 150 },

                {
                  field: "UnavailableDuration",
                  headerName: "Unavailable Duration",
                  width: 210,
                },

                { field: "uuid", headerName: "Unique ID", width: 240 },
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
                { field: "shift", headerName: "Shift", width: 150 },
                {
                  field: "supervisorName",
                  headerName: "Supervisor Name",
                  width: 240,
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
      </Grid>
    </Grid>
  );
}

export default RollSummary;
