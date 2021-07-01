import { AppBar, Grid, Tab, Tabs } from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import HomeTable from "./HomeTable";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      spacing={2}
      container
      item
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{
        marginTop: "8px",
      }}
    >
      {value === index && (
        <Grid container item>
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

function TableData({
  homeWorkerTable,
  homeDateTable,
  homeMachineTable,
  homeCTRTable,
}) {
  const [tabValue, setTabValue] = React.useState(0);
  const table1 = React.useRef(null);

  const handleTabChange = (event, newValue) => {
    console.log();
    setTabValue(newValue);
  };

  return (
    <>
      <Grid container item xs={12} style={{ padding: "12px" }}>
        <AppBar position="static" className="customTab">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="simple tabs example"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="By Worker" {...a11yProps(0)} />
            <Tab label="By Date" {...a11yProps(1)} />
            <Tab label="By Machine" {...a11yProps(2)} />
            <Tab label="By CLP-CTR" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <Grid
            container
            item
            xs={12}
            style={{ padding: "12px", width: "100%" }}
            ref={table1}
          >
            <HomeTable
              data={homeWorkerTable?.map((row, i) => {
                const { workerId, ...rest } = row;
                return { id: workerId, ...rest };
              })}
              column={[
                {
                  field: "id",
                  headerName: "Worker ID",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                // { headerName: "Worker ID", field: "workerId" },
                {
                  headerName: "Worker Name",
                  field: "workerName",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                // { headerName: "Total Working Hrs.", field: "totalWorkingHours" },
                {
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                {
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Feed Unavailable %",
                  field: "feedUnavPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  // hide: true,
                },
                {
                  headerName: "Worker Unavailable %",
                  field: "workerUnavPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  // hide: true,
                },
                {
                  headerName: "Idle Hrs.",
                  field: "idleHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Feed Unavailable Hrs.",
                  field: "feedUnav",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Worker Unavailable Hrs.",
                  field: "workerUnav",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Shift",
                  field: "shift",
                  hide: true,
                },
              ]}
            />
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              // data={homeDateTable}
              data={homeDateTable.map((row, i) => {
                const { date, ...rest } = row;
                return {
                  id: i,
                  date: moment(new Date(date))
                    .format("DD/MM/YYYY")
                    .toString(),
                  ...rest,
                };
              })}
              column={[
                {
                  field: "id",
                  headerName: "DataTableID",
                  hide: true,
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                },

                {
                  headerName: "Date",
                  field: "date",
                  render: (rowData) => {
                    const NewDate = moment(new Date(rowData.date))
                      .format("DD/MM/YYYY")
                      .toString();
                    return NewDate;
                  },
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                },
                {
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                },
                {
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                  hide: true,
                },
                {
                  headerName: "Worker Unavailable %",
                  field: "workerUnavPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                  // hide: true,
                },
                {
                  headerName: "Feed Unavailable %",
                  field: "feedUnavPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                  // hide: true,
                },
                {
                  headerName: "Idle Hrs.",
                  field: "idleHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                  hide: true,
                },
                {
                  headerName: "Feed Unavailable Hrs.",
                  field: "feedUnav",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                  hide: true,
                },
                {
                  headerName: "Worker Unavailable Hrs.",
                  field: "workerUnav",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 4
                      : 1280 / 4,
                  hide: true,
                },
                // { headerName: "Shift", field: "shift" },
              ]}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              // data={homeMachineTable}
              data={homeMachineTable.map((row, i) => {
                const {
                  utilizationPercentage,
                  machineOnOffStatus,
                  ...rest
                } = row;
                return {
                  id: i,
                  utilizationPercentage: `${Math.round(
                    utilizationPercentage
                  )} %`,
                  machineOnOffStatus: Boolean(machineOnOffStatus)
                    ? "On"
                    : "Off",
                  ...rest,
                };
              })}
              column={[
                {
                  field: "id",
                  headerName: "DataTableID",
                  hide: true,
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                {
                  headerName: "Machine Id",
                  field: "machineID",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                {
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                // { headerName: "Machine Breakdown Hrs.", field: "scheduledHours" },

                {
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Worker Unavailable %",
                  field: "WorkerUnavailablePercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  // hide: true,
                },
                {
                  headerName: "Feed Unavailable %",
                  field: "feedUnavailablePercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  // hide: true,
                },
                {
                  headerName: "Idle Hrs.",
                  field: "idleHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Worker Unavailable Hrs.",
                  field: "WorkerUnavailableHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Feed Unavailable Hrs.",
                  field: "feedUnavailableHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                // {
                //   headerName: "Off Time (Hrs.)",
                //   field: "machineOffTime",
                //   width: 240,
                // },
                // {
                //   headerName: "On Time (Hrs.)",
                //   field: "machineOnTime",
                //   width: 240,
                // },
                {
                  headerName: "Machine Status",
                  field: "machineOnOffStatus",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                // {
                //   headerName: "Shift",
                //   field: "shift",
                //   width: 180,
                // },
              ]}
            />
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              // data={homeCTRTable}
              data={homeCTRTable.map((row, i) => {
                const { CLPCTR, ...rest } = row;
                return {
                  id: i,
                  clp: CLPCTR,
                  ...rest,
                };
              })}
              column={[
                {
                  field: "id",
                  headerName: "DataTableID",
                  hide: true,
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                { headerName: "CLPCTR", field: "clp", width: 240 },
                {
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                },
                {
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Worker Unavailable %",
                  field: "workerUnavPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  // hide: true,
                },
                {
                  headerName: "Feed Unavailable %",
                  field: "feedUnavPercentage",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  // hide: true,
                },
                { headerName: "Idle Hrs.", field: "idleHours", width: 240 },
                {
                  headerName: "Worker Unavailable Hrs.",
                  field: "WorkerUnavailableHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                {
                  headerName: "Feed Unavailable Hrs.",
                  field: "feedUnavailableHours",
                  width:
                    table1?.current?.offsetWidth > 1280
                      ? table1?.current?.offsetWidth / 5
                      : 1280 / 5,
                  hide: true,
                },
                // { headerName: "Shift", field: "shift" },
              ]}
            />
          </Grid>
        </TabPanel>
      </Grid>
    </>
  );
}

export default TableData;
