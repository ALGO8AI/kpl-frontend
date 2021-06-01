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
      style={{ marginTop: "8px" }}
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

  const handleTabChange = (event, newValue) => {
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
          >
            <Tab label="By Worker" {...a11yProps(0)} />
            <Tab label="By Date" {...a11yProps(1)} />
            <Tab label="By Table" {...a11yProps(2)} />
            <Tab label="By CLP-CTR" {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={tabValue} index={0}>
          <Grid
            container
            item
            xs={12}
            style={{ padding: "12px", width: "100%" }}
          >
            <HomeTable
              // data={homeWorkerTable}
              data={homeWorkerTable.map((row, i) => {
                const { workerId, ...rest } = row;
                return { id: workerId, ...rest };
              })}
              columns={[
                { width: 240, headerName: "Worker ID", field: "id" },
                { width: 240, headerName: "Worker Name", field: "workerName" },
                // { width:240,headerName: "Total Working Hrs.", field: "totalWorkingHours" },
                {
                  width: 240,
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                },
                {
                  width: 240,
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                },
                { width: 240, headerName: "Idle Hrs.", field: "idleHours" },
                // { width:240,headerName: "Feed Unavailable Hrs.", field: "feedUnav" },
                {
                  width: 240,
                  headerName: "Worker Unavailable Hrs.",
                  field: "workerUnav",
                },
                // { width:240,headerName: "Shift", field: "shift" },
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
              columns={[
                {
                  field: "id",
                  headerName: "DataTableID",
                  hide: true,
                  width: 240,
                },
                {
                  width: 240,
                  headerName: "Date",
                  field: "date",
                  render: (rowData) => {
                    const NewDate = moment(new Date(rowData.date))
                      .format("DD/MM/YYYY")
                      .toString();
                    return NewDate;
                  },
                },
                {
                  width: 240,
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                },
                {
                  width: 240,
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                },
                { width: 240, headerName: "Idle Hrs.", field: "idleHours" },
                // { width:240,headerName: "Feed Unavailable Hrs.", field: "feedUnav" },
                {
                  width: 240,
                  headerName: "Worker Unavailable Hrs.",
                  field: "workerUnav",
                },
                // { width:240,headerName: "Shift", field: "shift" },
              ]}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              // data={homeMachineTable}
              data={homeMachineTable.map((row, i) => {
                const { utilizationPercentage, ...rest } = row;
                return {
                  id: i,
                  utilizationPercentage: `${Math.round(
                    utilizationPercentage
                  )} %`,
                  ...rest,
                };
              })}
              columns={[
                {
                  field: "id",
                  headerName: "DataTableID",
                  hide: true,
                  width: 240,
                },
                { width: 240, headerName: "Table Id", field: "tableId" },
                { width: 240, headerName: "Worker Name", field: "workerName" },
                { width: 240, headerName: "Worker Id", field: "workerId" },

                {
                  width: 240,
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                },
                {
                  width: 240,
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                },
                { width: 240, headerName: "Idle Hrs.", field: "idleHours" },
                // {
                //   width:240,headerName: "Feed Unavailable Hrs.",
                //   field: "feedUnav",
                // },
                {
                  width: 240,
                  headerName: "Worker Unavailable Hrs.",
                  field: "workerUnav",
                },
                // { width:240,headerName: "Shift", field: "shift" },
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
              columns={[
                {
                  field: "id",
                  headerName: "DataTableID",
                  hide: true,
                  width: 240,
                },
                { width: 240, headerName: "CLPCTR", field: "clp" },
                {
                  width: 240,
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                },
                {
                  width: 240,
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                },
                { width: 240, headerName: "Idle Hrs.", field: "idleHours" },
                {
                  width: 240,
                  headerName: "Worker Unavailable Hrs.",
                  field: "WorkerUnavailableHours",
                },
                // {
                //   width:240,headerName: "Feed Unavailable Hrs.",
                //   field: "feedUnavailableHours",
                // },
                // { width:240,headerName: "Shift", field: "shift" },
              ]}
            />
          </Grid>
        </TabPanel>
      </Grid>
    </>
  );
}

export default TableData;
