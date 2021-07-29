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
            variant="scrollable"
            scrollButtons="auto"
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
              data={
                homeWorkerTable?.length > 0 &&
                homeWorkerTable?.map((row, i) => {
                  const { checkerID, ...rest } = row;
                  return { id: checkerID, ...rest };
                })
              }
              columns={[
                { width: 180, headerName: "Checker ID", field: "id" },
                {
                  width: 180,
                  headerName: "Checker Name",
                  field: "checkerName",
                  // hide: true,
                },
                { width: 150, headerName: "Shift", field: "shift" },

                { width: 180, headerName: "Table Id", field: "tableId" },
                // { width:240,headerName: "Total Working Hrs.", field: "totalWorkingHours" },
                {
                  width: 240,
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                },
                {
                  width: 240,
                  headerName: "Unavailable Hrs.",
                  field: "unavailableDuration",
                  hide: true,
                },
                {
                  width: 240,
                  headerName: "Utilization %",
                  field: "utilizationPercentage",
                  // hide: true,
                },
                {
                  width: 240,
                  headerName: "Count Of Defects",
                  field: "defectCount",
                },
                {
                  width: 240,
                  headerName: "Defect %",
                  field: "defectPercentage",
                  // hide: true,
                },
              ]}
            />
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              // data={homeDateTable}
              data={homeDateTable?.map((row, i) => {
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
                // {
                //   width: 240,
                //   headerName: "% Utilization",
                //   field: "utilizationPercentage",
                //   hide: true,
                // },
                {
                  headerName: "Utilisation %",
                  field: "workerUnavPercentage",
                  width: 240,

                  // hide: true,
                },
                {
                  width: 240,
                  headerName: "Defect Count",
                  field: "defectCount",
                },
                {
                  width: 240,
                  headerName: "Worker Unavailable Hrs.",
                  field: "workerUnav",
                  hide: true,
                },
                {
                  headerName: "Defect %",
                  field: "defectPercentage",
                  width: 240,

                  // hide: true,
                },
                // { width: 240, headerName: "Idle Hrs.", field: "idleHours" },

                // {
                //   width: 240,
                //   headerName: "No. Of Bags Checked",
                //   field: "numBagsChecked",
                // },
                // {
                //   width: 240,
                //   headerName: "Count Of Defects",
                //   field: "defectCount",
                // },
                // { width:240,headerName: "Shift", field: "shift" },
              ]}
            />
          </Grid>
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              // data={homeMachineTable}
              data={
                homeMachineTable.length > 0 &&
                homeMachineTable?.map((row, i) => {
                  const { utilizationPercentage, ...rest } = row;
                  return {
                    id: i,
                    utilizationPercentage: `${Math.round(
                      utilizationPercentage
                    )} %`,
                    ...rest,
                  };
                })
              }
              columns={[
                {
                  field: "id",
                  headerName: "DataTableID",
                  hide: true,
                  width: 240,
                },
                { width: 240, headerName: "Table Id", field: "tableId" },
                // { width: 240, headerName: "Worker Name", field: "workerName" },
                // { width: 240, headerName: "Worker Id", field: "workerId" },

                {
                  width: 240,
                  headerName: "Scheduled Hrs.",
                  field: "scheduledHours",
                },
                // {
                //   width: 240,
                //   headerName: "% Utilization",
                //   field: "utilizationPercentage",
                // },
                // { width: 240, headerName: "Idle Hrs.", field: "idleHours" },
                // {
                //   width:240,headerName: "Feed Unavailable Hrs.",
                //   field: "feedUnav",
                // },
                {
                  width: 240,
                  headerName: "Utilisation %",
                  field: "workerUnavPercentage",
                },
                {
                  width: 240,
                  headerName: "Worker Unavailable Hrs.",
                  field: "workerUnav",
                  hide: true,
                },
                {
                  width: 240,
                  headerName: "Defect Count",
                  field: "max(defectCount)",
                },
                {
                  width: 240,
                  headerName: "Defect %",
                  field: "defectPercentage",
                },

                // {
                //   width: 240,
                //   headerName: "No. Of Bags Checked",
                //   field: "numBagsChecked",
                // },
                // {
                //   width: 240,
                //   headerName: "Count Of Defects",
                //   field: "defectCount",
                // },

                // { width:240,headerName: "Shift", field: "shift" },
              ]}
            />
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Grid container item xs={12} style={{ padding: "12px" }}>
            <HomeTable
              // data={homeCTRTable}
              data={
                homeCTRTable?.length > 0 &&
                homeCTRTable?.map((row, i) => {
                  const { CLPCTR, ...rest } = row;
                  return {
                    id: i,
                    clp: CLPCTR,
                    ...rest,
                  };
                })
              }
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
                  headerName: "Feed Unavailable %",
                  field: "feedUnavPercentage",
                },
                {
                  width: 240,
                  headerName: "Feed Unavailable Hrs.",
                  field: "feedUnavailableHours",
                },
                {
                  width: 240,
                  headerName: "% Utilization",
                  field: "utilizationPercentage",
                },
                { width: 240, headerName: "Idle Hrs.", field: "idleHours" },
                {
                  width: 240,
                  headerName: "Worker Unavailable %",
                  field: "workerUnavPercentage",
                },
                {
                  width: 240,
                  headerName: "Worker Unavailable Hrs.",
                  field: "WorkerUnavailableHours",
                },
                // {
                //   width: 240,
                //   headerName: "No. Of Bags Checked",
                //   field: "numBagsChecked",
                // },
                // {
                //   width: 240,
                //   headerName: "Count Of Defects",
                //   field: "defectCount",
                // },
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
