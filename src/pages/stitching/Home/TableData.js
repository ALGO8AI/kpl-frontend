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
        maxHeight: "50vh",
        overflow: "scroll",
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
          >
            <HomeTable
              data={homeWorkerTable}
              columns={[
                { title: "Worker ID", field: "workerId" },
                { title: "Worker Name", field: "workerName" },
                { title: "Scheduled Hrs.", field: "scheduledHours" },
                { title: "% Utilization", field: "utilizationPercentage" },
                { title: "Idle Hrs.", field: "idleHours" },
                { title: "Feed Unavailable Hrs.", field: "feedUnav" },
                { title: "Worker Unavailable Hrs.", field: "workerUnav" },
              ]}
            />
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              data={homeDateTable}
              columns={[
                {
                  title: "Date",
                  field: "date",
                  render: (rowData) => {
                    const NewDate = moment(new Date(rowData.date))
                      .format("DD/MM/YYYY")
                      .toString();
                    return NewDate;
                  },
                },
                { title: "Scheduled Hrs.", field: "scheduledHours" },
                { title: "% Utilization", field: "utilizationPercentage" },
                { title: "Idle Hrs.", field: "idleHours" },
                { title: "Feed Unavailable Hrs.", field: "feedUnav" },
                { title: "Worker Unavailable Hrs.", field: "workerUnav" },
              ]}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              data={homeMachineTable}
              columns={[
                { title: "Machine Id", field: "machineID" },
                { title: "Scheduled Hrs.", field: "scheduledHours" },
                {
                  title: "% Utilization",
                  field: "utilizationPercentage",
                },
                { title: "Idle Hrs.", field: "idleHours" },
                {
                  title: "Worker Unavailable Hrs.",
                  field: "WorkerUnavailableHours",
                },
                {
                  title: "Feed Unavailable Hrs.",
                  field: "feedUnavailableHours",
                },
              ]}
            />
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              data={homeCTRTable}
              columns={[
                { title: "CLPCTR", field: "CLPCTR" },
                { title: "Scheduled Hrs.", field: "scheduledHours" },
                {
                  title: "% Utilization",
                  field: "utilizationPercentage",
                },
                { title: "Idle Hrs.", field: "idleHours" },
                {
                  title: "Worker Unavailable Hrs.",
                  field: "WorkerUnavailableHours",
                },
                {
                  title: "Feed Unavailable Hrs.",
                  field: "feedUnavailableHours",
                },
              ]}
            />
          </Grid>
        </TabPanel>
      </Grid>
    </>
  );
}

export default TableData;
