/* eslint-disable eqeqeq */
import {
  AppBar,
  Button,
  Grid,
  Tab,
  Tabs,
  TextField,
  // Typography,
} from "@material-ui/core";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import PropTypes from "prop-types";

// import clsx from "clsx";
import moment from "moment";
import React from "react";
// import { notificationLogs } from "../../../";
import FilterListIcon from "@material-ui/icons/FilterList";
import { notificationLogs } from "../../../services/cuttingApi.service";

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

function DefectsLog() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [data, setData] = React.useState();
  const [filterDateFrom, setFilterDateFrom] = React.useState();
  const [filterDateTo, setFilterDateTo] = React.useState();

  const getLogs = async () => {
    try {
      const resp = await notificationLogs();
      console.log(resp?.defectRecords);
      setData(resp?.defectRecords);
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
      const resp = await notificationLogs(filterDateFrom, filterDateTo);
      // console.log(resp);
      setData(resp?.defectRecords);
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
            <Tab label="Defects Data" {...a11yProps(0)} />
            {/* <Tab label="Crowd Data" {...a11yProps(1)} />
            <Tab label="Worker Data" {...a11yProps(2)} />
            <Tab label="Machine Data" {...a11yProps(3)} /> */}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          {data?.length > 0 && (
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
                rows={data?.map((row, i) => {
                  const { date, acceptance, ...rest } = row;
                  return {
                    id: i,
                    acceptance: Boolean(Number(acceptance)) ? "Yes" : "No",
                    DateTime: moment(new Date(date))
                      .format("DD/MM/YYYY")
                      .toString(),
                    ...rest,
                  };
                })}
                columns={[
                  { field: "Id", headerName: "Defect ID", width: 210 },
                  { field: "DateTime", headerName: "Date", width: 150 },
                  { field: "time", headerName: "Time", width: 120 },
                  {
                    field: "rollBarcodeNumber",
                    headerName: "Roll Barcode Number",
                    width: 270,
                  },
                  { field: "machineId", headerName: "Machine ID", width: 150 },
                  {
                    field: "rollLenght",
                    headerName: "Total Meter Count",
                    width: 210,
                  },
                  {
                    field: "rollCategory",
                    headerName: "Roll Category",
                    width: 180,
                  },

                  // { field: "rollId", headerName: "Roll ID", width: 180 },

                  {
                    field: "wasteLength",
                    headerName: "Wastage (m)",
                    width: 210,
                    // hide: "true",
                  },
                  {
                    field: "action",
                    headerName: "Action Taken",
                    width: 240,
                  },
                  {
                    field: "violationReason",
                    headerName: "Defect Type",
                    width: 240,
                  },
                  {
                    field: "operatorId",
                    headerName: "Operator ID",
                    width: 180,
                  },
                  {
                    field: "operatorName",
                    headerName: "Operator Name",
                    width: 180,
                  },

                  {
                    field: "acceptance",
                    headerName: "Acceptance",
                    width: 180,
                  },

                  { field: "shift", headerName: "Shift", width: 150 },
                  // {
                  //   field: "status",
                  //   headerName: "Status",
                  //   width: 150,
                  // },
                  {
                    field: "actionStatus",
                    headerName: "Defect Status",
                    width: 210,
                  },
                ]}
                style={{ width: "100%" }}
              />
            </Grid>
          )}
        </TabPanel>
      </Grid>
    </Grid>
  );
}

export default DefectsLog;
